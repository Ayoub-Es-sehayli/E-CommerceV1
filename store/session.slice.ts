import { createSlice } from "@reduxjs/toolkit";

interface SessionState {
  isLoggedIn: boolean;
}

const initialState: SessionState = {
  isLoggedIn: false,
};

export const SessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = SessionSlice.actions;
export default SessionSlice.reducer;
