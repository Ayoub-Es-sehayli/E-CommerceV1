import { useAppDispatch, useAppSelector } from "@store/hooks";
import { login, logout } from "@store/session.slice";
import { signOut } from "firebase/auth";
import { useCallback, useEffect } from "react";
import { firebaseAuth } from "services/firebase-service";

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
        localStorage.setItem("userId", user.uid);
        dispatch(login());
      } else {
        localStorage.removeItem("userId");
        dispatch(logout());
      }
    });
    return () => {
      listener();
    };
  }, []);

  return { isLoggedIn, Logout };
}
