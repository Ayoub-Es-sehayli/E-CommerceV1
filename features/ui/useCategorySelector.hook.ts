import { useAppSelector } from "@store/hooks";
import { useCallback } from "react";

export default function useCategorySelector() {
  const { categories } = useAppSelector((state) => state.UISlice);

  const getCategoryById = useCallback((categoryId: string) => {
    interface CatFilter {
      path: string;
      name: string;
    }
    const selectedCategoryFilter: CatFilter[] = [
      ...(categories as CatFilter[]),
      ...categories
        .map<CatFilter[]>((category) =>
          category.subcategories ? category.subcategories : []
        )
        .flat(),

      ...categories
        .map<CatFilter[]>((category) =>
          category.subcategories
            ? category.subcategories
                .map((subCategory) =>
                  subCategory.subcategories ? subCategory.subcategories : []
                )
                .flat()
            : []
        )
        .flat(),
    ].filter((category) => category.path == categoryId);

    return selectedCategoryFilter.length ? selectedCategoryFilter[0].name : "";
  }, []);

  return getCategoryById;
}
