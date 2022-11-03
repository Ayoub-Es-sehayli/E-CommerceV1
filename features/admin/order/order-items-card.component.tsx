import CardItem from "./card-item.component";
import Card from "./card.component";
import { OrderItemModel } from "./order.model";
import useOrderItem from "./useOrderItem.hook";

type OrderItemProps = {
  item: OrderItemModel;
};
function OrderItem({ item }: OrderItemProps) {
  const { orderItem } = useOrderItem(item);
  return (
    <CardItem
      title={orderItem.name!}
      value={orderItem.quantity.toString()}
      classNames={{
        title: "font-normal w-3/4 border-r border-black",
        value: "w-1/5",
      }}
    />
  );
}
type CardProps = {
  items: OrderItemModel[];
};
export default function OrderItemsCard({ items }: CardProps) {
  return (
    <Card title="">
      <span className="flex flex-wrap justify-between font-bold gap-x-2 px-2 rounded-md">
        <span className="w-3/4 border-r border-black">Produit</span>
        <span>Quantité</span>
      </span>
      {items.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </Card>
  );
}
