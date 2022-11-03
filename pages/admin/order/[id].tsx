import { OrderFormContainer } from "@features/admin/order";
import AdminLayout from "@features/admin/ui/admin.layout";
import { NextPageWithLayout } from "pages/_app";

const OrderPage: NextPageWithLayout = () => {
  return <OrderFormContainer />;
};

OrderPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default OrderPage;
