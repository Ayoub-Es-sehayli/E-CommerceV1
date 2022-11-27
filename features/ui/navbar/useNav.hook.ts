import useSession from "@features/session/useSession.hook";
import { useAppSelector } from "@store/hooks";
import {
  useHierarchicalMenu,
  UseHierarchicalMenuProps,
  useInstantSearch,
} from "react-instantsearch-hooks-web";

export default function useNav(algoliaProps: UseHierarchicalMenuProps) {
  const { isLoggedIn, Logout } = useSession();
  const { categories } = useAppSelector((state) => state.UISlice);
  const { setIndexUiState } = useInstantSearch();
  const refine = (value: string) => {
    setIndexUiState((oldState) => {
      const newState = {
        ...oldState,
        hierarchicalMenu: {
          "category.lvl0": [value],
        },
      };
      return newState;
    });
  };
  return {
    isLoggedIn,
    categories,
    refine,
    Logout,
  };
}
