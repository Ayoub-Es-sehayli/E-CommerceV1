import useSession from "@features/session/useSession.hook";
import { useAppSelector } from "@store/hooks";
import {
  useHierarchicalMenu,
  UseHierarchicalMenuProps,
} from "react-instantsearch-hooks-web";

export default function useNav(algoliaProps: UseHierarchicalMenuProps) {
  const { isLoggedIn, Logout } = useSession();
  const { categories } = useAppSelector((state) => state.UISlice);
  const { refine } = useHierarchicalMenu({
    ...algoliaProps,
    attributes: ["category.lvl0", "category.lvl1", "category.lvl2"],
  });
  return {
    isLoggedIn,
    categories,
    refine,
    Logout,
  };
}
