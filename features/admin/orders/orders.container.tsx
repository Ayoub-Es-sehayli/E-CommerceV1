import Spinner from "@features/ui/spinner.component";
import Head from "next/head";
import Pagination from "../ui/pagination.component";
import DateSelectorForm from "./date-selector.component";
import OrdersList from "./order-list.component";
import OrderTabs from "./tabs.components";
import useOrders from "./useOrders.hook";

export default function OrdersContainer() {
  const {
    orders,
    isLoading,
    tabs,
    dataSelectionFormData,
    handleDateSelection,
  } = useOrders();

  return (
    <>
      <Head>
        <title>Administration Parafait - Liste des Commandes</title>
      </Head>
      <div className="flex flex-col gap-0">
        <header className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <h1 className="text-primary-400 font-bold text-xl font-serif">
              Commandes
            </h1>
            <DateSelectorForm
              initialValues={dataSelectionFormData}
              onSubmit={handleDateSelection}
            />
          </div>
          <OrderTabs tabs={tabs} />
        </header>

        <div className="flex flex-col gap-2 items-center px-2">
          <Spinner isLoading={isLoading} />
          <OrdersList orders={orders} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
