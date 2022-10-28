import useBrandSelector from "@features/ui/useBrandSelector.hook";
import useCategorySelector from "@features/ui/useCategorySelector.hook";
import useThumbnail from "@features/ui/useThumbnail.hook";
import { useAppSelector } from "@store/hooks";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { algoliaAdminClient } from "services/algolia-service";
import { firebaseDb, firebaseStorage } from "services/firebase-service";
import { ProductConverter } from "./product.converter";
import { ProductDbModel } from "./product.model";
import { ProductBaseModel } from "./product.schema";

export default function useProduct() {
  const { query, push, replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const getCategoryById = useCategorySelector();
  const getBrandById = useBrandSelector();
  const [product, setProduct] = useState<ProductBaseModel>({
    brand: "Marque",
    category: "Categorie",
    name: "Produit",
    price: 0,
    quantity: 0,
    salePercentage: 0,
    thumbnail: "",
    thumbnailUrl: undefined,
  });
  const { brands, categories } = useAppSelector((state) => state.UISlice);
  const getThumbnail = useThumbnail();
  useEffect(() => {
    setIsLoading(true);
    // Check if new product
    if (query.id) {
      if (query.id !== "new") {
        // Load product
        getDoc(
          doc(firebaseDb, "products", query.id as string).withConverter(
            ProductConverter
          )
        )
          .then((product) => {
            const productData = product.data();
            if (productData) {
              setProduct(productData);
            }
          })
          .catch((error) => console.error(error));
      }
    }
    setIsLoading(false);
  }, [query]);
  // Setup Form initialValues and actions

  const handleSubmit = useCallback(
    async (
      values: ProductDbModel,
      { setSubmitting }: FormikHelpers<ProductDbModel>
    ) => {
      setSubmitting(true);

      const index = algoliaAdminClient.initIndex(
        process.env.ALGOLIA_INDEX_NAME as string
      );

      // 1. Upload Thumbnail
      try {
        let thumbnail = values.thumbnail;
        if (values.thumbnail.includes("data:image")) {
          const productsRef = ref(firebaseStorage, "products");
          const thumbnailRef = ref(
            productsRef,
            values.name.replaceAll(" ", "_")
          );
          const uploadResult = await uploadString(
            thumbnailRef,
            values.thumbnail,
            "data_url"
          );
          thumbnail = uploadResult.ref.name;
        }
        const model = {
          ...values,
          quantity: values.quantity ? values.quantity : 0,
          thumbnail: thumbnail,
          category: doc(firebaseDb, values.category),
          brand: doc(firebaseDb, "/brands/" + values.brand),
          createdAt: Timestamp.fromDate(new Date()),
        };
        delete model["thumbnailUrl"];
        // 2. Upsert Product
        let modelId = query.id as string;
        if (query.id === "new") {
          const productRef = await addDoc(
            collection(firebaseDb, "products"),
            model
          );
          modelId = productRef.id;
          push(`/admin/products`);
        } else if (query.id !== "new") {
          await updateDoc(doc(firebaseDb, "products", modelId), model);

          replace(`/admin/products`);
        }
        // 3. Upsert to Algolia
        const getCategoryLevels = (category: string) => {
          const modelCategory = category.split("/");
          const level = modelCategory.length / 2;
          let categoryLevels: {
            lvl0: string;
            lvl1?: string;
            lvl2?: string;
          } = {
            lvl0: getCategoryById(`categories/${modelCategory[1]}`),
            lvl1: undefined,
            lvl2: undefined,
          };
          if (level > 1) {
            categoryLevels.lvl1 =
              categoryLevels.lvl0 +
              " | " +
              getCategoryById(
                `categories/${modelCategory[1]}/subcategories/${modelCategory[3]}`
              );
            if (level > 2) {
              categoryLevels.lvl2 =
                categoryLevels.lvl1 +
                " | " +
                getCategoryById(
                  `categories/${modelCategory[1]}/subcategories/${modelCategory[3]}/subcategories/${modelCategory[5]}`
                );
            }
          }
          return categoryLevels;
        };
        const searchModel = {
          objectID: modelId,
          ...model,
          category: getCategoryLevels(values.category),
          brand: getBrandById(values.brand),
        };

        await index.saveObject(searchModel, {
          autoGenerateObjectIDIfNotExist: false,
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  const handleThumbnailReplace = async (
    event: FormEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    try {
      const file = (<HTMLInputElement>event.target).files![0];

      if (!file) return;
      const result: Promise<string> = new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const thumbnail = await getThumbnail(await result);
      setFieldValue("thumbnail", thumbnail);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    isLoading,
    product,
    brands,
    categories,
    handleSubmit,
    handleThumbnailReplace,
  };
}
