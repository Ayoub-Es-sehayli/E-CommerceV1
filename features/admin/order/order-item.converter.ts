import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";
import { OrderItemModel } from "./order.model";

const OrderItemConverter: FirestoreDataConverter<OrderItemModel> = {
  toFirestore: (product: WithFieldValue<OrderItemModel>): DocumentData => {
    return { ...product };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): OrderItemModel => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      quantity: 0,
    };
  },
};
export default OrderItemConverter;
