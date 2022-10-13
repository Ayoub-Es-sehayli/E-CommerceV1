import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useMemo, useState } from "react";

export default function useCart() {
  // const dispatch = useAppDispatch();
  const { items, shipping, clientId } = useAppSelector(
    (state) => state.CartSlice
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      if (item.price) {
        return sum + item.price * item.quantity;
      }
      return 0;
    }, 0);
  }, [items]);

  return { items, total, shipping, clientId, isLoading };
}
