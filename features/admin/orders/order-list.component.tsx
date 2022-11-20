import EOrderStatus from "@features/ui/order-status.enum";
import { flexRender } from "@tanstack/react-table";
import React from "react";
import OrderItem from "./order-item.component";
import { OrderListRowModel } from "./order-item.model";
import useOrderTable from "./useOrderTable.hook";

type ListProps = {
  orders: OrderListRowModel[];
  isLoading: boolean;
};
export default function OrdersList({ orders, isLoading }: ListProps) {
  const table = useOrderTable(orders, isLoading);
  return (
    <table className="daisy-table w-full text-left m-4">
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
      <tfoot></tfoot>
    </table>
  );
}
