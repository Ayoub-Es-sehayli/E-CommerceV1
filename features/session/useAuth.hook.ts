import { useAppDispatch, useAppSelector } from "@store/hooks";
import { login, logout } from "@store/session.slice";
import { useEffect } from "react";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.SessionSlice.isLoggedIn);
  // Confirm Email Sign In
  useEffect(() => {
  }, []);

  // Check current user
  useEffect(() => {
    const user = firebaseAuth.currentUser;

    if (user) {
      dispatch(login());
      // TODO: Load Favourites
      // ...
    } else {
      dispatch(logout());
    }
  }, []);

  return { isLoggedIn };
}
