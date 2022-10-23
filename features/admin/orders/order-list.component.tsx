import EOrderStatus from "@features/ui/order-status.enum";
import React from "react";
import OrderItem from "./order-item.component";
import { OrderListRowModel } from "./order-item.model";

type ListProps = {
  orders: OrderListRowModel[];
  getStatusName: (status: EOrderStatus) => string;
};
export default function OrdersList({ orders, getStatusName }: ListProps) {
  return (
    <section className="text-left px-2">
      <header className="flex justify-left gap-12 py-2 font-bold">
        <span className="w-[22ch]">Code</span>
        <span className="w-[25ch]">Client</span>
        <span className="w-[10ch]">Livraison</span>
        <span className="w-[10ch]">Status</span>
        <span>Date Commande</span>
      </header>
      <div>
        {!orders.length ? (
          <div className="flex justify-center">
            Il n'ya aucun produit dans la base
          </div>
        ) : (
          orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              getStatusName={getStatusName}
            />
          ))
        )}
      </div>
    </section>
  );
}
