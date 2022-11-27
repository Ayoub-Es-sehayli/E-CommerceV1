import BrandContainer from "@features/admin/brand";
import AdminLayout from "@features/admin/ui/admin.layout";
import { NextPageWithLayout } from "pages/_app";

const BrandPage: NextPageWithLayout = () => {
  return <BrandContainer />;
};

BrandPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default BrandPage;
