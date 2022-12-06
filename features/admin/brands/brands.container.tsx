import * as Dialog from "@radix-ui/react-dialog";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import { useAppSelector } from "@store/hooks";
import { useMutation } from "@tanstack/react-query";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";

const useBrands = () => {
  const brands = useAppSelector((state) => state.UISlice.brands);
  const columnHelper = createColumnHelper<typeof brands[number]>();
  const columns: ColumnDef<typeof brands[number], any>[] = [
    columnHelper.accessor("id", {
      header: "Code",
    }),
    columnHelper.accessor("name", {
      header: "Marque",
    }),
    {
      id: "actions",
      header: () => (
        <Link href="/admin/brand">
          <a className=" bg-primary-200 bi bi-plus px-5 py-0.5 rounded-md hover:bg-primary-400 hover:text-white"></a>
        </Link>
      ),
      cell: ({ row: { getValue } }) => (
        <span className="flex gap-2">
          <Link
            href={`/admin/brand?id=${getValue("id")}&name=${getValue("name")}`}
          >
            <a className="bi bi-pencil bg-primary-400 text-white py-0.5 px-5 rounded-md hover:bg-primary-200 hover:text-black" />
          </Link>
          {/* <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="bi bi-eraser bg-accent text-white py-0.5 px-1 rounded-md hover:bg-accent-200 hover:text-black"></button>
            </Dialog.Trigger>
            <ConfirmDialog
              value={getValue("name")}
              action={() => deleteBrand(getValue("id"))}
            />
          </Dialog.Root> */}
        </span>
      ),
    },
  ];
  const data = useMemo(() => brands, [brands]);
  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });
  return {
    table,
    name,
  };
};
export default function BrandsContainer() {
  const { table, name } = useBrands();
  return (
    <>
      <Head>
        <title>Gestion des Marques</title>
      </Head>
      <table className="w-full text-left m-4">
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
                <td key={cell.id} className="py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
