import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";
import { OrderDbModel } from "../orders/order-item.model";

const OrdersConverter: FirestoreDataConverter<OrderDbModel> = {
  toFirestore(order: WithFieldValue<OrderDbModel>): DocumentData {
    return { ...order };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): OrderDbModel {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      clientId: data.clientId,
      items: data.items,
      recipient: data.recipient,
      shipping: data.shipping,
      status: {
        type: data.status.type,
        date: (data.status.date as Timestamp).toDate(),
      },
      history: data.history
        ? data.history.map((item: any) => {
            return {
              type: item.type,
              date: (item.date as Timestamp).toDate(),
            };
          })
        : undefined,
      total: data.total,
    };
  },
};

export default OrdersConverter;
