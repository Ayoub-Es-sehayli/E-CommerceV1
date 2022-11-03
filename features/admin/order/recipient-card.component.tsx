import CardItem from "./card-item.component";
import Card from "./card.component";
import { OrderRecipientModel } from "./order.model";

type RecipientProps = {
  recipient?: OrderRecipientModel;
  CopyToClipboard: (value: string) => void;
};
export default function RecipientCard({
  recipient,
  CopyToClipboard,
}: RecipientProps) {
  return (
    <Card title="Destinataire">
      <CardItem
        title="Nom Complet"
        value={recipient?.fullName!}
        onClick={() => CopyToClipboard(recipient?.fullName!)}
      />
      <CardItem
        title="Télephone"
        value={recipient?.tel!}
        onClick={() => CopyToClipboard(recipient?.tel!)}
      />
      <CardItem
        title="Ville"
        value={recipient?.city!}
        onClick={() => CopyToClipboard(recipient?.city!)}
      />
      <CardItem
        title="Addresse"
        value={recipient?.address!}
        onClick={() => CopyToClipboard(recipient?.address!)}
      />
    </Card>
  );
}
