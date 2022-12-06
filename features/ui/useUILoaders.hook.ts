import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Brand, Category, setBrands, setCategories } from "@store/ui.slice";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirebaseDb } from "services/firebase-service";
import BrandConverter from "./brand.converter";
import CategoryConverter from "./category.converter";

async function GetCategoriesAtLevel(current?: Category) {
  const firebaseDb = useFirebaseDb();
  const queryConstraints = [orderBy("productCount", "desc")];
  const collectionPath: string = current
    ? `${current.path}/subcategories`
    : "categories";
  let data = await getDocs(
    query(
      collection(firebaseDb, collectionPath),
      ...queryConstraints
    ).withConverter(CategoryConverter)
  );
  const categories: Category[] = await Promise.all(
    data.docs.map<Promise<Category>>(async (current) => {
      let currentCategory: Category = {
        ...current.data(),
      };
      const hierarchyLevel = currentCategory.path.split("/").length / 2;
      const hasSubLevel: boolean = hierarchyLevel < 3;
      if (hasSubLevel) {
        currentCategory.subcategories = await GetCategoriesAtLevel(
          currentCategory
        );
      }
      return currentCategory;
    })
  );
  return categories;
}
export default function useUILoaders() {
  const firebaseDb = useFirebaseDb();
  const dispatch = useAppDispatch();
  const { isLoading: areBrandsLoading } = useQuery(
    ["brands"],
    () => {
      return getDocs(
        collection(firebaseDb, "brands").withConverter(BrandConverter)
      ).then((result) => result.docs.map((brand) => brand.data()));
    },
    {
      onSuccess: (result) => {
        dispatch(setBrands(result));
      },
    }
  );
  const { isLoading: areCategoriesLoading } = useQuery(
    ["categories"],
    () => {
      return GetCategoriesAtLevel();
    },
    {
      onSuccess: (result) => {
        dispatch(setCategories(result));
      },
    }
  );
  return { isLoading: areBrandsLoading && areCategoriesLoading };
}
