import OrdersContainer from "@features/admin/orders";
import AdminLayout from "@features/admin/ui/admin.layout";
import { NextPageWithLayout } from "pages/_app";

const OrdersPage: NextPageWithLayout = () => {
  return <OrdersContainer />;
};

OrdersPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default OrdersPage;
