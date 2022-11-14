import useSession from "@features/session/useSession.hook";
import { useAppSelector } from "@store/hooks";

export default function useNav() {
  const { isLoggedIn, Logout } = useSession();
  const { categories } = useAppSelector((state) => state.UISlice);

  return {
    isLoggedIn,
    categories,
    Logout,
  };
}
