import EOrderStatus from "@features/ui/order-status.enum";
import React from "react";
import { TabProps } from "./order-item.model";

function Tab({ label, count, active, variant, filterOrders }: TabProps) {
  return (
    <button
      onClick={() => filterOrders()}
      className={`flex items-center gap-2 py-1.5 px-3 rounded-t-lg ${
        active ? "bg-white font-bold" : "hover:bg-light-200"
      }`}
    >
      <span className={variant.label}>{label}</span>
      <span className={`${variant.count} px-1 rounded-lg`}>{count}</span>
    </button>
  );
}
export default function OrderTabs({ tabs }: { tabs: TabProps[] }) {
  return (
    <div className="flex gap-1 bg-light px-4 pt-2">
      {tabs.map((tab) => (
        <Tab key={tab.label} {...tab} />
      ))}
    </div>
  );
}
