import { ProductCardModel } from "@features/ui/useProduct";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = ProductCardModel & {
  quantity: number;
};

type ShippingModel = {
  address: string;
  city: string;
};

interface CartState {
  clientId?: string;
  items: CartItem[];
  shipping: ShippingModel;
}

const initialState: CartState = {
  items: [],
  shipping: {
    address: "",
    city: "",
  },
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      { payload: product }: PayloadAction<ProductCardModel>
    ) => {
      const exists = state.items.map((i) => i.id).includes(product.id);

      if (exists) return;

      const item: CartItem = { ...product, quantity: 1 };

      return { ...state, items: [...state.items, item] };
    },
    setItemQuantity: (
      state,
      {
        payload: { id, quantity },
      }: PayloadAction<{ id: string; quantity: number }>
    ) => {
      state.items.map((item) => {
        if (item.id === id) {
          item.quantity = quantity;
        }
        return item;
      });
    },
    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      };
    },
  },
});

export const { addToCart, removeFromCart, setItemQuantity } = CartSlice.actions;
export default CartSlice.reducer;
