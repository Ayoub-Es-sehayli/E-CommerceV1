import { useCallback } from "react";
import EOrderStatus from "./order-status.enum";

export default function useStatusSelector() {
  const getStatusName = useCallback((status?: EOrderStatus) => {
    switch (status) {
      case EOrderStatus.Ordered:
        return { label: "Commandée", variant: "info" };
      case EOrderStatus.Validated:
        return { label: "Validée", variant: "warning" };
      case EOrderStatus.Delivering:
        return { label: "En Cours", variant: "warning" };
      case EOrderStatus.Delivered:
        return { label: "Livrée", variant: "primary-200" };
      case EOrderStatus.Cancelled:
        return { label: "Annulée", variant: "accent" };
      default:
        return { label: "", variant: "grey-200" };
    }
  }, []);
  return getStatusName;
}
