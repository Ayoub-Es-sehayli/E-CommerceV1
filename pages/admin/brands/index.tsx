import BrandsContainer from "@features/admin/brands";
import AdminLayout from "@features/admin/ui/admin.layout";
import { NextPageWithLayout } from "pages/_app";

const BrandsPage: NextPageWithLayout = () => {
  return <BrandsContainer />;
};

BrandsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default BrandsPage;
