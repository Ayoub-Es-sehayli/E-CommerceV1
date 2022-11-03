import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseDb } from "services/firebase-service";
import OrderItemConverter from "./order-item.converter";
import { OrderItemModel } from "./order.model";

export default function useOrderItem(item: OrderItemModel) {
  const [orderItem, setOrderItem] = useState<OrderItemModel>(item);
  useEffect(() => {
    getDoc(
      doc(firebaseDb, "products", item.id).withConverter(OrderItemConverter)
    ).then((result) => {
      const data = result.data();
      if (data) {
        setOrderItem({
          ...item,
          name: data.name,
        });
      }
    });
  }, [item]);

  return { orderItem };
}
