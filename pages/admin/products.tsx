import ProductsContainer from "@features/admin/products/products.container";
import AdminLayout from "@features/admin/ui/admin.layout";
import { NextPageWithLayout } from "pages/_app";

const ProductsPage: NextPageWithLayout = () => {
  return <ProductsContainer />;
};

ProductsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default ProductsPage;
