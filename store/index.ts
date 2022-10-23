import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "./admin.slice";
import CartSlice from "./cart.slice";
import SessionSlice from "./session.slice";
import UISlice from "./ui.slice";
export const store = configureStore({
  reducer: {
    SessionSlice,
    CartSlice,
    UISlice,
    AdminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
