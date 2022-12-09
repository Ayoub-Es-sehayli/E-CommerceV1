import useBrandSelector from "@features/ui/useBrandSelector.hook";
import useCategorySelector from "@features/ui/useCategorySelector.hook";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as dbQuery,
  QueryConstraint,
} from "firebase/firestore";
import { useFirebaseDb } from "services/firebase-service";
import { ProductItemModel } from "./product-item.model";
import { ProductListItemConverter } from "./products.converter";

export default function useProducts() {
  const firebaseDb = useFirebaseDb();
  const getBrandById = useBrandSelector();
  const getCategoryById = useCategorySelector();

  const { data: products, isLoading } = useQuery(["product-list"], () => {
    const queryConstraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
    queryConstraints.push(limit(15));
    const productsQuery = dbQuery(
      collection(firebaseDb, "products"),
      ...queryConstraints
    ).withConverter(ProductListItemConverter);
    return getDocs(productsQuery).then<ProductItemModel[]>((result) => {
      if (!result.empty) {
        return result.docs.map((product) => {
          const productData = product.data();
          return {
            ...productData,
            category: getCategoryById(productData.category),
            brand: getBrandById(productData.brand),
          };
        });
      }
      return [];
    });
  });
  if (!products) return { products: [], isLoading };

  return { products, isLoading };
}
