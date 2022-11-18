import Spinner from "@features/ui/spinner.component";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import React, { useMemo } from "react";
import { ProductItemModel } from "./product-item.model";

export default function ProductList({
  isLoading,
  products,
}: {
  isLoading: boolean;
  products: ProductItemModel[];
}) {
  const columnHelper = createColumnHelper<ProductItemModel>();
  const [tableColumns, data] = useMemo(() => {
    const columns = [
      columnHelper.accessor("name", {
        cell: (info) => (
          <td className="max-w-[30ch] overflow-hidden whitespace-nowrap text-ellipsis">
            {info.getValue()}
          </td>
        ),
        header: () => (
          <span className="max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">
            Produit
          </span>
        ),
      }),
      columnHelper.accessor("brand", {
        cell: (info) => info.getValue(),
        header: "Marque",
      }),
      columnHelper.accessor("category", {
        cell: (info) => info.getValue(),
        header: "Catégorie",
      }),
      columnHelper.accessor("price", {
        cell: (info) => info.getValue(),
        header: "Prix",
      }),

      columnHelper.accessor("createdAt", {
        cell: (info) => info.getValue().toLocaleDateString("fr-fr"),
        header: "Date d'arrivage",
      }),
      columnHelper.accessor("id", {
        header: "",
        cell: (info) => (
          <span className="text-white flex justify-end w-full gap-1">
            <Link href={`/admin/product/${info.getValue()}`}>
              <a className="bi bi-pencil rounded-lg p-2 bg-primary-400"></a>
            </Link>
            <button className="bi bi-trash rounded-lg p-2 bg-accent"></button>
          </span>
        ),
      }),
    ];
    return [columns, products];
  }, [isLoading]);
  const table = useReactTable({
    columns: tableColumns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: () => {
    //   mutation.mutate();
    // },
  });
  return (
    <section>
      <Spinner isLoading={isLoading} />
      <table className="daisy-table w-full text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </section>
  );
}
