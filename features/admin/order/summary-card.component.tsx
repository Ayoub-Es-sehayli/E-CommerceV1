import CardItem from "./card-item.component";
import Card from "./card.component";
import { OrderSummaryModel } from "./order.model";

type SummaryProps = {
  summary?: OrderSummaryModel;
};
export default function SummaryCard({ summary }: SummaryProps) {
  return (
    <Card title="Commande">
      <CardItem title="Total" value={summary?.total + " DH"} />
      <CardItem
        title="Nb° d'articles"
        value={summary?.nbItems.toString() + ""}
      />
      <CardItem title="Date de Commande" value={summary?.date!} />
    </Card>
  );
}
