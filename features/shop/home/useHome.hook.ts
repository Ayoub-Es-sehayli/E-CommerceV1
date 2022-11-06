import { ProductConverter } from "@features/ui/product.converter";
import { ProductCardModel } from "@features/ui/useProduct";
import useThumbnail from "@features/ui/useThumbnail.hook";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseDb } from "services/firebase-service";

export default function useHome() {
  const [latest, setLatest] = useState<ProductCardModel[]>([]);
  const [onSale, setOnSale] = useState<ProductCardModel[]>([]);
  const [annoucements, setAnnoucements] = useState<
    { id: string; src: string }[]
  >([]);
  const getThumbnail = useThumbnail();

  try {
    // Load Annoucements
    useEffect(() => {
      const newAnnoucements: typeof annoucements = [];
      getDocs(query(collection(firebaseDb, "products"))).then((result) => {
        result.forEach((annoucement) => {
          const data = annoucement.data();
          getThumbnail(data.src).then((thumbnail) => {
            newAnnoucements.push({
              id: annoucement.id,
              src: thumbnail,
            });
          });
        });
        setAnnoucements(newAnnoucements);
      });
    }, []);
    // Load Latest Products
    useEffect(() => {
      const products: ProductCardModel[] = [];
      const queryConstraints: QueryConstraint[] = [
        orderBy("createdAt", "desc"),
        limit(5),
      ];

      getDocs(
        query(
          collection(firebaseDb, "products"),
          ...queryConstraints
        ).withConverter(ProductConverter)
      ).then((result) => {
        result.forEach((product) => {
          products.push(product);
        });
        setLatest(products);
      });
    }, []);
    // Load On Sale  Products
    useEffect(() => {
      const products: ProductCardModel[] = [];
      const queryConstraints: QueryConstraint[] = [
        orderBy("createdAt", "desc"),
        where("salePercentage", ">", 0.0),
        limit(5),
      ];
      getDocs(
        query(
          collection(firebaseDb, "products"),
          ...queryConstraints
        ).withConverter(ProductConverter)
      ).then((result) => {
        result.forEach((product) => {
          products.push(product);
        });
        setOnSale(products);
      });
    }, []);
  } catch (error) {
    console.log(error);
  }

  return { latest, onSale, annoucements };
}
