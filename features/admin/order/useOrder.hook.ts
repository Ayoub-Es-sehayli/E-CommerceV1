import EOrderStatus from "@features/ui/order-status.enum";
import useStatusSelector from "@features/ui/useStatusSelector.hook";
import { useAppSelector } from "@store/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { firebaseDb } from "services/firebase-service";
import OrdersConverter from "../ui/orders.converter";
import OrderItemConverter from "./order-item.converter";
import {
  HistoryItemModel,
  OrderItemModel,
  OrderPageModel,
} from "./order.model";

export default function useOrder() {
  const { query, push, isReady } = useRouter();
  const getOrderStatus = useStatusSelector();
  const [orderId, setOrderId] = useState<string>("");
  const qs = useQueryClient();
  useEffect(() => {
    if (isReady) {
      const { id } = query;
      if (!id) {
        push("/admin/orders");
      }
      setOrderId(id as string);
    }
  }, [isReady]);
  const loadOrderItem = useCallback((item: OrderItemModel) => {
    return getDoc(
      doc(firebaseDb, "products", item.id).withConverter(OrderItemConverter)
    ).then((result) => {
      const data = result.data();
      if (!data) return item;
      return {
        ...item,
        name: data.name,
      };
    });
  }, []);
  const loadOrder = useCallback(() => {
    const orderRef = doc(firebaseDb, "orders", orderId).withConverter(
      OrdersConverter
    );
    return getDoc(orderRef).then(async (result) => {
      const resultData = result.data()!;

      return {
        ...resultData,
        history: resultData.history ? resultData.history : [],
        items: resultData.items
          ? await Promise.all(
              resultData.items.map((item) =>
                loadOrderItem(item).then((result) => result)
              )
            )
          : [],
      };
    });
  }, [orderId]);
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery(["order", orderId], loadOrder, {
    select: (data) => {
      const orderData: OrderPageModel = {
        ...data,
        status: getOrderStatus(data.status.type),
        history: data.history.map<HistoryItemModel>((item) => {
          return {
            date: item.date,
            type: item.type,
          };
        }),
        recipient: {
          ...data.shipping,
          fullName: data.recipient.lastName + " " + data.recipient.firstName,
          tel: data.recipient.tel,
        },
        summary: {
          total: data.total,
          date: data.status.date.toLocaleDateString("fr-fr"),
          nbItems: data.items.length,
        },
      };
      return orderData;
    },
    enabled: orderId.length > 0,
  });
  const mutation = useMutation({
    mutationFn: (orderDraft: { id: string; status: EOrderStatus }) => {
      const orderRef = doc(firebaseDb, "orders", orderDraft.id);
      return runTransaction(firebaseDb, async (transaction) => {
        const oldOrderRef = await transaction.get(
          orderRef.withConverter(OrdersConverter)
        );
        const { history } = oldOrderRef.data()!;
        const updatedOrder = {
          status: {
            date: new Date(),
            type: orderDraft.status,
          },
          history: [
            {
              date: new Date(),
              type: orderDraft.status,
            },
            ...(history ? history : []),
          ],
        };
        transaction.update(orderRef, updatedOrder);
      });
    },
  });
  const HandleStatusChange = (status: EOrderStatus) => {
    if (!order || order.status === getOrderStatus(status)) {
      return;
    }
    qs.invalidateQueries(["order", orderId]);
    let orderDraft = {
      id: order.id,
      status: status,
    };
    mutation.mutate(orderDraft);
    refetch();
  };
  const CopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    alert("Copié!");
  };
  return { order, isLoading, HandleStatusChange, CopyToClipboard };
}
