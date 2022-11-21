import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { OrderItemModel } from "./order.model";

// type OrderItemProps = {
//   item: OrderItemModel;
// };
// function OrderItem({ item }: OrderItemProps) {
//   const { orderItem } = useOrderItem(item);
//   return (
//     <CardItem
//       title={orderItem.name!}
//       value={orderItem.quantity.toString()}
//       classNames={{
//         title: ,
//         value: "w-1/5",
//       }}
//     />
//   );
// }
type CardProps = {
  items: OrderItemModel[];
  isLoading: boolean;
};
export default function OrderItemsCard({ items, isLoading }: CardProps) {
  const columnHelper = createColumnHelper<OrderItemModel>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("name", {
        header: "Produit",
        cell: (info) => <span className="">{info.getValue()}</span>,
      }),
      columnHelper.accessor("quantity", {
        header: "Quantité",
        cell: (info) => info.getValue(),
      }),
    ];
  }, []);

  const data = useMemo(() => items, [isLoading, items]);
  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="text-left m-4">
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
