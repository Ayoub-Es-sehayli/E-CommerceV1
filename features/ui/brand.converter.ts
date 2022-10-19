import { Brand } from "@store/ui.slice";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";

const BrandConverter: FirestoreDataConverter<Brand> = {
  toFirestore(brand: WithFieldValue<Brand>): DocumentData {
    return { ...brand };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Brand {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      productCount: data.productCount,
    };
  },
};

export default BrandConverter;
