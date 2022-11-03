import EOrderStatus from "@features/ui/order-status.enum";

export type OrderItemModel = {
  id: string;
  name?: string;
  quantity: number;
};
export type HistoryItemModel = {
  date: Date;
  type: EOrderStatus;
};
export type OrderSummaryModel = {
  total: number;
  nbItems: number;
  date: string;
};
export type OrderRecipientModel = {
  fullName: string;
  tel: string;
  city: string;
  address: string;
};
export type OrderPageModel = {
  id: string;
  status: {
    label: string;
    variant: string;
  };
  recipient: OrderRecipientModel;
  items: OrderItemModel[];
  summary: OrderSummaryModel;
  history: HistoryItemModel[];
};
