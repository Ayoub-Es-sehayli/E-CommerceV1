import { useAppSelector } from "@store/hooks";
import Link from "next/link";
import {
  useHierarchicalMenu,
  useInstantSearch,
} from "react-instantsearch-hooks-web";

export default function CategoryGrid() {
  const categories = useAppSelector((state) => state.UISlice.categories);
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
  return (
    <>
      {Array.from({ length: categories.length / 3 }, (v, i) => {
        return (
          <div
            key={i}
            className={`grid md:grid-flow-col md:grid-cols-${
              i % 2 === 0
                ? "[1.2fr_1fr_1.2fr] gap-4"
                : "[1fr_1.5fr_1fr] gap-y-4 gap-x-2"
            }`}
          >
            {categories.map((cat, idx) => {
              if (idx >= i * 3 && idx < (i + 1) * 3) {
                return (
                  <Link key={cat.id} href="/shop/products">
                    <a
                      onClick={() => refine(cat.name)}
                      className="flex bg-light rounded-xl p-4 capitalize text-center justify-center place-items-center"
                    >
                      {cat.name}
                    </a>
                  </Link>
                );
              }
            })}
          </div>
        );
      })}
    </>
  );
}
