import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";
import { ProductBaseModel } from "./product.schema";

export const ProductConverter: FirestoreDataConverter<ProductBaseModel> = {
  toFirestore: (product: WithFieldValue<ProductBaseModel>): DocumentData => {
    return { ...product };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): ProductBaseModel => {
    const data = snapshot.data();
    return {
      name: data.name,
      brand: data.brand.id,
      category: data.category.path,
      price: data.price,
      thumbnail: data.thumbnail,
      quantity: data.quantity,
      salePercentage: data.salePercentage,
      thumbnailUrl: undefined,
    };
  },
};
