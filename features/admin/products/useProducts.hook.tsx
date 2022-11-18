import useBrandSelector from "@features/ui/useBrandSelector.hook";
import useCategorySelector from "@features/ui/useCategorySelector.hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowSelection,
  useReactTable,
} from "@tanstack/react-table";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as dbQuery,
  QueryConstraint,
  startAt,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { firebaseDb } from "services/firebase-service";
import { ProductItemModel } from "./product-item.model";
import { ProductListItemConverter } from "./products.converter";

export default function useProducts() {
  const getBrandById = useBrandSelector();
  const getCategoryById = useCategorySelector();

  const { data: products, isLoading } = useQuery(["product-list"], () => {
    const queryConstraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
    // if (table && table.getState()) {
    //   const currentPage: number = table.getState().pagination.pageIndex + 1;

    //   queryConstraints.push(startAt(currentPage * 15));
    // }
    queryConstraints.push(limit(15));
    const productsQuery = dbQuery(
      collection(firebaseDb, "products"),
      ...queryConstraints
    ).withConverter(ProductListItemConverter);
    return getDocs(productsQuery).then<ProductItemModel[]>((result) => {
      if (!result.empty) {
        return result.docs.map((product) => {
          const productData = product.data();
          return {
            ...productData,
            category: getCategoryById(productData.category),
            brand: getBrandById(productData.brand),
          };
        });
      }
      return [];
    });
  });
  const qs = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return qs.invalidateQueries({ queryKey: ["product-list"] });
    },
  });
  if (!products) return { products: [], isLoading };

  return { products, isLoading };
}
