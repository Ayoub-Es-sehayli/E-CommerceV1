import EOrderStatus from "@features/ui/order-status.enum";
import useStatusSelector from "@features/ui/useStatusSelector.hook";
import { useAppSelector } from "@store/hooks";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firebaseDb } from "services/firebase-service";
import { HistoryItemModel, OrderPageModel } from "./order.model";

export default function useOrder() {
  const { query, push } = useRouter();
  const { orders } = useAppSelector((state) => state.AdminSlice);
  const [isLoading, setIsLoading] = useState(false);
  const getOrderStatus = useStatusSelector();
  const [order, setOrder] = useState<OrderPageModel>({
    id: "",
    status: {
      label: "",
      variant: "",
    },
    history: [],
    items: [],
    recipient: {
      fullName: "",
      address: "",
      city: "",
      tel: "",
    },
    summary: {
      date: "",
      nbItems: 0,
      total: 0,
    },
  });
  useEffect(() => {
    setIsLoading(true);
    try {
      if (!query.id) {
        push("/admin/orders");
      }
      if (orders.length) {
        orders.filter((value) => {
          if (value.id === query.id) {
            setOrder({
              id: value.id,
              status: getOrderStatus(value.status.type),
              history: value.history
                ? value.history.map<HistoryItemModel>((item) => {
                    return {
                      date: new Date(item.date),
                      type: item.type,
                    };
                  })
                : [],
              items: value.items,
              recipient: {
                fullName:
                  value.recipient.lastName + " " + value.recipient.firstName,
                address: value.shipping.address,
                city: value.shipping.city,
                tel: value.recipient.tel,
              },
              summary: {
                total: value.total,
                date: value.status.date,
                nbItems: value.items.length,
              },
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, []);
  const HandleStatusChange = (status: EOrderStatus) => {
    if (order.status === getOrderStatus(status)) {
      return;
    }
    let orderDraft: any = { status: order.status, history: [...order.history] };
    orderDraft.status = getOrderStatus(status);
    orderDraft.history.push({
      date: new Date(),
      type: status,
    });
    setOrder({ ...order, ...orderDraft });
    orderDraft.status = {
      date: new Date(),
      type: status,
    };
    const orderRef = doc(firebaseDb, "orders", order.id);
    updateDoc(orderRef, orderDraft).catch((error) => {
      alert("Une erreur s'est produite lors de la mise à jour de la commande");
      console.error(error);
    });
  };
  const CopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    alert("Copié!");
  };
  return { order, isLoading, HandleStatusChange, CopyToClipboard };
}
