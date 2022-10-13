import { configureStore } from "@reduxjs/toolkit";
import SessionSlice from "./session.slice";
import CartSlice from "./cart.slice";
export const store = configureStore({
  reducer: {
    SessionSlice,
    CartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
