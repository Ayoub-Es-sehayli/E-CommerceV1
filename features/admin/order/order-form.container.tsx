import Spinner from "@features/ui/spinner.component";
import Toast from "@features/ui/toast.component";
import {
  Provider as ToastProvider,
  Viewport as ToastViewport,
} from "@radix-ui/react-toast";
import Head from "next/head";
import HistoryCard from "./history-card.component";
import OrderItemsCard from "./order-items-card.component";
import RecipientCard from "./recipient-card.component";
import StatusChangeModal from "./status-change-modal.component";
import SummaryCard from "./summary-card.component";
import useOrder from "./useOrder.hook";

export default function OrderFormContainer() {
  const {
    order,
    isLoading,
    HandleStatusChange,
    CopyToClipboard,
    toastOpen,
    toastMessage,
    setToastOpen,
  } = useOrder();
  if (!order || isLoading) {
    return <Spinner isLoading />;
  }
  return (
    <>
      <Head>
        <title>Administration Parafait - Details de la commande</title>
      </Head>
      <ToastProvider>
        <article className="flex flex-col items-start font-sans w-full">
          <h1 className="font-bold font-serif text-2xl text-primary-400">
            <span>Commande {order.id} (</span>

            <StatusChangeModal
              status={order.status}
              HandleStatusChange={HandleStatusChange}
            />

            <span>)</span>
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
              <h2 className="font-serif text-xl underline">
                Liste des articles
              </h2>
              <OrderItemsCard items={order.items} isLoading={isLoading} />
            </aside>
          </section>
        </article>
        <Toast
          title={toastMessage}
          content=""
          duration={3000}
          onOpenChange={setToastOpen}
          open={toastOpen}
        ></Toast>
        <ToastViewport className="fixed bottom-0 right-0 flex flex-col gap-3 outline-none p-6" />
      </ToastProvider>
    </>
  );
}
