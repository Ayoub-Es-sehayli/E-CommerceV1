import OrdersConverter from "@features/admin/ui/orders.converter";
import EOrderStatus from "@features/ui/order-status.enum";
import useStatusSelector from "@features/ui/useStatusSelector.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  orderBy,
  query as dbQuery,
  QueryConstraint,
  Timestamp,
  where,
} from "firebase/firestore";
import { FormikHelpers } from "formik";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { useFirebaseDb } from "services/firebase-service";
import {
  DateSelectionFormData,
  OrderDbModel,
  OrderListRowModel,
  TabProps,
} from "./order-item.model";

export default function useOrders() {
  const firebaseDb = useFirebaseDb();
  const getStatus = useStatusSelector();
  const [filter, setFilter] = useState<EOrderStatus>();
  const [startMonth, setStartMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const qs = useQueryClient();
  const loadOrders = useCallback(() => {
    const nextMonth = moment(startMonth).add(1, "months").toDate();
    const queryConstraints: QueryConstraint[] = [
      where("status.date", ">=", Timestamp.fromDate(startMonth)),
      where("status.date", "<", Timestamp.fromDate(nextMonth)),
      orderBy("status.date", "desc"),
    ];
    const query = dbQuery(
      collection(firebaseDb, "orders"),
      ...queryConstraints
    ).withConverter(OrdersConverter);
    return getDocs(query).then((results) =>
      results.docs.map((order) => order.data())
    );
  }, [startMonth]);
  const {
    data: allOrders,
    isLoading,
    refetch,
  } = useQuery(["order-list", startMonth], loadOrders, {
    select: (data) => {
      return data.map<OrderListRowModel>((order) => {
        return {
          id: order.id,
          status: order.status,
          client: order.recipient.firstName + " " + order.recipient.lastName,
        };
      });
    },
    notifyOnChangeProps: ["data", "error"],
  });
  const handleDateSelection = useCallback(
    (
      values: DateSelectionFormData,
      {}: FormikHelpers<DateSelectionFormData>
    ) => {
      qs.invalidateQueries(["order-list", startMonth]);
      const newDate = new Date(values.year, values.month - 1, 1);
      setStartMonth(newDate);
      refetch();
    },
    []
  );
  const dataSelectionFormData: DateSelectionFormData = {
    month: startMonth.getMonth() + 1,
    year: startMonth.getFullYear(),
  };

  const countByStatus: {
    all: number;
    ordered: number;
    validated: number;
    delivering: number;
    delivered: number;
    cancelled: number;
  } = useMemo(() => {
    if (!allOrders)
      return {
        all: 0,
        cancelled: 0,
        delivered: 0,
        delivering: 0,
        ordered: 0,
        validated: 0,
      };
    return {
      all: allOrders.length,
      ordered: allOrders.filter(
        (order) => order.status.type === EOrderStatus.Ordered
      ).length,
      validated: allOrders.filter(
        (order) => order.status.type === EOrderStatus.Validated
      ).length,
      cancelled: allOrders.filter(
        (order) => order.status.type === EOrderStatus.Cancelled
      ).length,
      delivered: allOrders.filter(
        (order) => order.status.type === EOrderStatus.Delivered
      ).length,
      delivering: allOrders.filter(
        (order) => order.status.type === EOrderStatus.Delivering
      ).length,
    };
  }, [allOrders]);
  const tabs: TabProps[] = useMemo(() => {
    const props: TabProps[] = [
      {
        label: "Tous les Commandes",
        count: countByStatus.all,
        active: filter === undefined,
        variant: {
          label: `text-${getStatus().variant}`,
          count: `bg-${getStatus().variant}`,
        },
        filterOrders: () => filterOrders(undefined),
      },
      {
        label: "Commandées",
        count: countByStatus.ordered,
        active: filter === EOrderStatus.Ordered,
        variant: {
          label: `text-${getStatus(EOrderStatus.Ordered).variant}`,
          count: `bg-${getStatus(EOrderStatus.Ordered).variant}`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Ordered),
      },
      {
        label: "Validées",
        count: countByStatus.validated,
        active: filter === EOrderStatus.Validated,
        variant: {
          label: `text-${getStatus(EOrderStatus.Validated).variant}`,
          count: `bg-${getStatus(EOrderStatus.Validated).variant}`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Validated),
      },
      {
        label: "En cours",
        count: countByStatus.delivering,
        active: filter === EOrderStatus.Delivering,
        variant: {
          label: `text-${getStatus(EOrderStatus.Delivering).variant}`,
          count: `bg-${getStatus(EOrderStatus.Delivering).variant}`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Delivering),
      },
      {
        label: "Livrées",
        count: countByStatus.delivered,
        active: filter === EOrderStatus.Delivered,
        variant: {
          label: `text-${getStatus(EOrderStatus.Delivered).variant}`,
          count: `bg-${getStatus(EOrderStatus.Delivered).variant} text-white`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Delivered),
      },
      {
        label: "Annulée",
        count: countByStatus.cancelled,
        active: filter === EOrderStatus.Cancelled,
        variant: {
          label: `text-${getStatus(EOrderStatus.Cancelled).variant}`,
          count: `bg-${getStatus(EOrderStatus.Cancelled).variant} text-white`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Cancelled),
      },
    ];
    return props;
  }, [allOrders, filter]);

  const orders: OrderListRowModel[] = useMemo(() => {
    if (!allOrders) return [];
    return !filter
      ? allOrders
      : allOrders.filter((order) => order.status.type === filter);
  }, [allOrders, filter, startMonth]);

  const filterOrders = useCallback((tabFilter?: EOrderStatus) => {
    setFilter(tabFilter);
  }, []);

  return {
    orders,
    isLoading: isLoading,
    tabs,
    handleDateSelection,
    dataSelectionFormData,
  };
}
