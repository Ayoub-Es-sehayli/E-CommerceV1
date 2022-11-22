import useStatusSelector from "@features/ui/useStatusSelector.hook";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { OrderListRowModel } from "./order-item.model";

export default function useOrderTable(
  orders: OrderListRowModel[],
  isLoading: boolean
) {
  const getStatus = useStatusSelector();
  const columnHelper = createColumnHelper<OrderListRowModel>();
  const columns: ColumnDef<OrderListRowModel, any>[] = [
    columnHelper.accessor("id", {
      header: "Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("client", {
      header: "Client",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("id", {
      header: "Livraison",
      cell: "A Domicile",
    }),
    columnHelper.accessor("status.type", {
      header: "Status",
      cell: (info) => (
        <span className={`text-${getStatus(info.getValue()).variant}`}>
          {getStatus(info.getValue()).label}
        </span>
      ),
    }),
    columnHelper.accessor("status.date", {
      header: "Code",
      cell: (info) => info.getValue().toLocaleDateString("fr-fr"),
    }),
    columnHelper.accessor("id", {
      header: "",
      cell: (info) => (
        <Link href={`/admin/order/${info.getValue()}`}>
          <a className="bg-primary-200 rounded-lg px-2 text-white bi bi-chevron-right"></a>
        </Link>
      ),
    }),
  ];
  const data = useMemo(() => orders, [isLoading, orders]);
  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return table;
}
