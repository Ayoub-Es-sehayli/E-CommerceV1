import { configureStore } from "@reduxjs/toolkit";
import SessionSlice from "./session.slice";
export const store = configureStore({
  reducer: {
    SessionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
