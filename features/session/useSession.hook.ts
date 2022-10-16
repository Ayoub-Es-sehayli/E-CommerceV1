import { useAppDispatch, useAppSelector } from "@store/hooks";
import { login, logout } from "@store/session.slice";
import { useCallback, useEffect } from "react";
import { firebaseAuth } from "services/firebase-service";
import { signOut } from "firebase/auth";

export default function useSession() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.SessionSlice.isLoggedIn);

  const Logout = useCallback(() => {
    dispatch(logout());
    signOut(firebaseAuth);
  }, []);

  useEffect(() => {
    const listener = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    });
    return () => {
      listener();
    };
  }, []);

  return { isLoggedIn, Logout };
}
