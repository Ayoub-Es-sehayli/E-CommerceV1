import useBrandSelector from "@features/ui/useBrandSelector.hook";
import useCategorySelector from "@features/ui/useCategorySelector.hook";
import useThumbnail from "@features/ui/useThumbnail.hook";
import { useAppSelector } from "@store/hooks";
import { doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { FormikHelpers, useField, useFormik, useFormikContext } from "formik";
import { useRouter } from "next/router";
import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { firebaseDb, firebaseStorage } from "services/firebase-service";
import { ProductConverter } from "./product.converter";
import { ProductDbModel } from "./product.model";
import { ProductBaseModel, ProductSchema } from "./product.schema";

export default function useProduct() {
  const { query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    (
      values: ProductDbModel,
      { setSubmitting }: FormikHelpers<ProductDbModel>
    ) => {
      setSubmitting(true);
      console.log(values);
      // Upload to Firebase
      // Upload to Algolia
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
