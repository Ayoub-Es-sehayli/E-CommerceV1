import EOrderStatus from "@features/ui/order-status.enum";
import { setOrders } from "@store/admin.slice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query as dbQuery,
  QueryConstraint,
  Timestamp,
  where,
} from "firebase/firestore";
import { FormikHelpers } from "formik";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { firebaseDb } from "services/firebase-service";
import {
  DateSelectionFormData,
  OrderDbModel,
  OrderListRowModel,
  TabProps,
} from "./order-item.model";
import OrdersConverter from "./orders.converter";

export default function useOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { orders: allOrders } = useAppSelector((state) => state.AdminSlice);
  const [filter, setFilter] = useState<EOrderStatus>();
  const [startMonth, setStartMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  useEffect(() => {
    setIsLoading(true);
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
    getDocs(query).then((results) => {
      const newOrders: OrderDbModel[] = [];
      results.docChanges().forEach(({ doc: order, type: changeType }) => {
        if (changeType === "added") {
          newOrders.push({
            ...order.data(),
          });
        }
      });
      dispatch(setOrders(newOrders));
      setIsLoading(false);
    });
  }, [startMonth]);
  const getStatusVariant = useCallback((status?: EOrderStatus) => {
    switch (status) {
      case EOrderStatus.Ordered:
        return "info";
      case EOrderStatus.Validated:
        return "warning";
      case EOrderStatus.Delivering:
        return "warning";
      case EOrderStatus.Delivered:
        return "primary-200";
      case EOrderStatus.Cancelled:
        return "accent";
      default:
        return "";
    }
  }, []);

  const orders: OrderListRowModel[] = useMemo(() => {
    return (
      !filter
        ? allOrders
        : allOrders.filter((order) => order.status.type === filter)
    ).map<OrderListRowModel>((order) => {
      return {
        id: order.id,
        status: order.status,
        client: order.recipient.firstName + " " + order.recipient.lastName,
        statusVariant: `text-${getStatusVariant(order.status.type)}`,
      };
    });
  }, [allOrders, filter, startMonth]);

  const countByStatus: {
    all: number;
    ordered: number;
    validated: number;
    delivering: number;
    delivered: number;
    cancelled: number;
  } = useMemo(() => {
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

  const filterOrders = useCallback((tabFilter?: EOrderStatus) => {
    setFilter(tabFilter);
  }, []);
  const tabs: TabProps[] = useMemo(() => {
    const props: TabProps[] = [
      {
        label: "Tous les Commandes",
        count: countByStatus.all,
        active: filter === undefined,
        variant: {
          label: getStatusVariant(),
          count: "bg-grey-200",
        },
        filterOrders: () => filterOrders(undefined),
      },
      {
        label: "Commandées",
        count: countByStatus.ordered,
        active: filter === EOrderStatus.Ordered,
        variant: {
          label: `text-info`,
          count: `bg-info-200`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Ordered),
      },
      {
        label: "Validées",
        count: countByStatus.validated,
        active: filter === EOrderStatus.Validated,
        variant: {
          label: `text-warning`,
          count: `bg-warning`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Validated),
      },
      {
        label: "En cours",
        count: countByStatus.delivering,
        active: filter === EOrderStatus.Delivering,
        variant: {
          label: `text-${getStatusVariant(EOrderStatus.Delivering)}`,
          count: `bg-${getStatusVariant(EOrderStatus.Delivering)}`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Delivering),
      },
      {
        label: "Livrées",
        count: countByStatus.delivered,
        active: filter === EOrderStatus.Delivered,
        variant: {
          label: `text-${getStatusVariant(EOrderStatus.Delivered)}`,
          count: `bg-${getStatusVariant(EOrderStatus.Delivered)} text-white`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Delivered),
      },
      {
        label: "Annulée",
        count: countByStatus.cancelled,
        active: filter === EOrderStatus.Cancelled,
        variant: {
          label: `text-${getStatusVariant(EOrderStatus.Cancelled)}`,
          count: `bg-${getStatusVariant(EOrderStatus.Cancelled)} text-white`,
        },
        filterOrders: () => filterOrders(EOrderStatus.Cancelled),
      },
    ];
    return props;
  }, [allOrders, filter]);
  const getStatusName = useCallback((status: EOrderStatus) => {
    switch (status) {
      case EOrderStatus.Ordered:
        return "Commandée";
      case EOrderStatus.Validated:
        return "Validée";
      case EOrderStatus.Delivering:
        return "En Cours";
      case EOrderStatus.Delivered:
        return "Livrée";
      case EOrderStatus.Cancelled:
        return "Annulée";
    }
  }, []);

  const handleDateSelection = (
    values: DateSelectionFormData,
    {}: FormikHelpers<DateSelectionFormData>
  ) => {
    const newDate = new Date(values.year, values.month - 1, 1);
    setStartMonth(newDate);
  };
  const dataSelectionFormData: DateSelectionFormData = {
    month: startMonth.getMonth() + 1,
    year: startMonth.getFullYear(),
  };

  return {
    orders,
    isLoading,
    tabs,
    getStatusName,
    handleDateSelection,
    dataSelectionFormData,
  };
}
