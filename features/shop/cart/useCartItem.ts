import { CartItem, removeFromCart, setItemQuantity } from "@store/cart.slice";
import { useAppDispatch } from "@store/hooks";
import { FieldArrayRenderProps, FieldHookConfig } from "formik";
import { useCallback, useMemo } from "react";
export type CartItemProps = FieldHookConfig<{
  id: string;
  quantity: number;
}> & {
  arrayHelpers: FieldArrayRenderProps;
  index: number;
  item: CartItem;
};
export default function useCartItem(props: CartItemProps) {
  const { item, arrayHelpers, index } = props;
  const dispatch = useAppDispatch();

  const total = useMemo(() => {
    return item.price! * item.quantity;
  }, [item]);

  const IncreaseQuantity = useCallback(() => {
    const quantity = item.quantity + 1;
    dispatch(
      setItemQuantity({
        id: item.id,
        quantity: quantity,
      })
    );
  }, [item]);
  const DecreaseQuantity = useCallback(() => {
    dispatch(
      setItemQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  }, [item]);
  const RemoveItem = useCallback(() => {
    arrayHelpers.remove(index);
    dispatch(removeFromCart(item.id));
  }, [item]);

  return { item, total, index, IncreaseQuantity, DecreaseQuantity, RemoveItem };
}
