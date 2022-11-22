import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./cart.slice";
import SessionSlice from "./session.slice";
import UISlice from "./ui.slice";
export const store = configureStore({
  reducer: {
    SessionSlice,
    CartSlice,
    UISlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
