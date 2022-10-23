import EOrderStatus from "@features/ui/order-status.enum";
import Link from "next/link";
import React from "react";
import { OrderListRowModel } from "./order-item.model";

type ItemProps = {
  order: OrderListRowModel;
  getStatusName: (status: EOrderStatus) => string;
};
export default function OrderItem({ order, getStatusName }: ItemProps) {
  return (
    <article className="odd:bg-light-200 flex justify-left gap-12 py-1 px-1">
      <span className="w-[22ch]">{order.id}</span>
      <span className="w-[25ch] overflow-hidden whitespace-nowrap text-ellipsis">
        {order.client}
      </span>
      <span className="w-[10ch]">A Domicile</span>
      <span className={`w-[10ch] ${order.statusVariant}`}>
        {getStatusName(order.status.type)}
      </span>
      <span>{order.status.date}</span>
      <span>
        <Link href={`/admin/order/${order.id}`}>
          <a className="bg-primary-200 rounded-lg px-2 text-white bi bi-chevron-right"></a>
        </Link>
      </span>
    </article>
  );
}
