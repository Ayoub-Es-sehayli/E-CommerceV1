import {
  OrderDbModel,
  OrderStatusModel,
} from "@features/admin/orders/order-item.model";
import EOrderStatus from "@features/ui/order-status.enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
  orders: OrderDbModel[];
}

const initialState: AdminState = {
  orders: [],
};

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setOrders: (state, { payload: orders }: PayloadAction<OrderDbModel[]>) => {
      state.orders = orders;
    },
    setOrderStatus: (
      state,
      {
        payload,
      }: PayloadAction<{ order: OrderDbModel; status: OrderStatusModel }>
    ) => {
      state.orders = state.orders.map((order) => {
        if (order.id === payload.order.id) {
          order.status = payload.status;
          order.history ? order.history.push(payload.status) : [payload.status];
        }
        return order;
      });
    },
  },
});

export const { setOrders } = AdminSlice.actions;
export default AdminSlice.reducer;
