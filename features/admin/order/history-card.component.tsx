import useStatusSelector from "@features/ui/useStatusSelector.hook";
import { useEffect, useState } from "react";
import CardItem from "./card-item.component";
import Card from "./card.component";
import { HistoryItemModel } from "./order.model";

type ItemProps = {
  item: HistoryItemModel;
};
function useHistoryItem(item: HistoryItemModel) {
  const [viewModel, setViewModel] = useState<{
    title: string;
    value: string;
    valueClass: string;
  }>({ title: "", value: "", valueClass: "" });
  const getStatusName = useStatusSelector();
  useEffect(() => {
    const status = getStatusName(item.type);
    setViewModel({
      title: item.date.toLocaleDateString("fr-fr"),
      value: status.label,
      valueClass: `text-${status.variant}`,
    });
  }, []);

  return { viewModel };
}
function HistoryItem({ item }: ItemProps) {
  const { viewModel } = useHistoryItem(item);
  return (
    <CardItem
      title={viewModel.title}
      value={viewModel.value}
      classNames={{ value: viewModel.valueClass }}
    />
  );
}
type HistoryCardProps = {
  items?: HistoryItemModel[];
};
export default function HistoryCard({ items }: HistoryCardProps) {
  return (
    <Card title="Historique">
      {items && items.length ? (
        items.map((item) => (
          <HistoryItem key={item.type.toString()} item={item} />
        ))
      ) : (
        <span className="p-2">
          Aucune Historique est disponible en ce moment!
        </span>
      )}
    </Card>
  );
}
