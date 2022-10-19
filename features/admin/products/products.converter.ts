import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";
import { ProductItemModel } from "./product-item.model";

export const ProductListItemConverter: FirestoreDataConverter<ProductItemModel> =
  {
    toFirestore: (product: WithFieldValue<ProductItemModel>): DocumentData => {
      return { ...product };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): ProductItemModel => {
      const data = snapshot.data();

      return {
        id: snapshot.id,
        name: data.name,
        brand: data.brand.id,
        category: data.category.path,
        price: data.price,
        salePercentage: data.salePercentage,
        createdAt: (data.createdAt as Timestamp).toDate(),
      };
    },
  };
