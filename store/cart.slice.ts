import { ProductCardModel } from "@features/ui/useProduct";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = ProductCardModel & {
  quantity: number;
};

interface CartState {
  clientId?: string;
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
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
    clearCartItems: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, setItemQuantity, clearCartItems } =
  CartSlice.actions;
export default CartSlice.reducer;
