import ProductContainer from "@features/admin/product/product.container";
import AdminLayout from "@features/admin/ui/admin.layout";
import { NextPageWithLayout } from "pages/_app";

const ProductPage: NextPageWithLayout = () => {
  return <ProductContainer />;
};

ProductPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default ProductPage;
