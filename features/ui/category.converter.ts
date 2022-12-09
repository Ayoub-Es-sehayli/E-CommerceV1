import { Category } from "@store/ui.slice";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";

const CategoryConverter: FirestoreDataConverter<Category> = {
  toFirestore(category: WithFieldValue<Category>): DocumentData {
    return { ...category };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Category {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      path: snapshot.ref.path,
      name: data.name,
      subcategories: data.subcategories,
    };
  },
};

export default CategoryConverter;
