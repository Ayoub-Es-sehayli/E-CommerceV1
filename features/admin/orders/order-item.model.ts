import EOrderStatus from "@features/ui/order-status.enum";
export type TabProps = {
  label: string;
  count: number;
  active: boolean;
  variant: {
    label: string;
    count: string;
  };
  filterOrders: (tabFilter?: EOrderStatus) => void;
};
export interface DateSelectionFormData {
  month: number;
  year: number;
}
export type OrderListRowModel = {
  id: string;
  client: string;
  status: OrderStatusModel;
  statusVariant: string;
};
export type OrderItemModel = {
  id: string;
  quantity: number;
};
export type OrderStatusModel = {
  date: string;
  type: EOrderStatus;
};
export type OrderDbModel = {
  id: string;
  clientId: string;
  recipient: {
    firstName: string;
    lastName: string;
    tel: string;
  };
  shipping: {
    address: string;
    city: string;
  };
  status: OrderStatusModel;
  history?: OrderStatusModel[];
  items: OrderItemModel[];
};
