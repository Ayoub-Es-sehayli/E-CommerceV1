import Spinner from "@features/ui/spinner.component";
import HistoryCard from "./history-card.component";
import OrderItemsCard from "./order-items-card.component";
import RecipientCard from "./recipient-card.component";
import StatusChangeModal from "./status-change-modal.component";
import SummaryCard from "./summary-card.component";
import useOrder from "./useOrder.hook";

export default function OrderFormContainer() {
  const { order, isLoading, HandleStatusChange, CopyToClipboard } = useOrder();
  if (isLoading) {
    return <Spinner isLoading />;
  }
  return (
    <article className="flex flex-col items-start font-sans w-full">
      <h1 className="font-bold font-serif text-2xl text-primary-400">
        Commande {order.id} (
        <label
          htmlFor="status-modal"
          className={`text-${order.status.variant} hover:underline hover:cursor-pointer`}
        >
          {order.status.label}
        </label>
        )
      </h1>
      <section className="flex w-full gap-6">
        <section className="space-y-2 w-full">
          <h2 className="font-serif text-xl underline">
            Détails de la commande
          </h2>
          {/* Row 1 */}
          <div className="flex gap-8 justify-between">
            {/* Recipient Card */}
            <RecipientCard
              recipient={order.recipient}
              CopyToClipboard={CopyToClipboard}
            />
            {/* Order Card */}
            <SummaryCard summary={order.summary} />
          </div>
          {/* Row 2 */}
          <div className="flex justify-center">
            {/* History Card */}
            <HistoryCard items={order.history} />
          </div>
        </section>
        {/* Product List */}
        <aside className="w-3/4">
          <h2 className="font-serif text-xl underline">Liste des articles</h2>
          <OrderItemsCard items={order.items} />
        </aside>
      </section>
      <StatusChangeModal HandleStatusChange={HandleStatusChange} />
    </article>
  );
}
