import useBrandSelector from "@features/ui/useBrandSelector.hook";
import useCategorySelector from "@features/ui/useCategorySelector.hook";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as dbQuery,
  QueryConstraint,
  startAt,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firebaseDb } from "services/firebase-service";
import { number } from "yup";
import { ProductItemModel } from "./product-item.model";
import { ProductListItemConverter } from "./products.converter";

export default function useProducts() {
  const { query: routerQuery } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductItemModel[]>([]);
  const getBrandById = useBrandSelector();
  const getCategoryById = useCategorySelector();

  useEffect(() => {
    setIsLoading(true);
    const newProductList: ProductItemModel[] = [];
    const queryConstraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
    if (routerQuery.page && (routerQuery.page as string) !== "1") {
      const currentPage: number = parseInt(routerQuery.page as string);
      queryConstraints.push(startAt(currentPage * 15));
    }
    queryConstraints.push(limit(15));
    const productsQuery = dbQuery(
      collection(firebaseDb, "products"),
      ...queryConstraints
    ).withConverter(ProductListItemConverter);
    getDocs(productsQuery).then((result) => {
      result.forEach((product) => {
        const productData = product.data();
        newProductList.push({
          ...productData,
          category: getCategoryById(productData.category),
          brand: getBrandById(productData.brand),
        });
      });
      setProducts(newProductList);
      setIsLoading(false);
    });
  }, [routerQuery]);

  return { products, isLoading };
}
