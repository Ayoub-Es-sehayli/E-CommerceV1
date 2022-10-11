import ProductsContainer from "@features/shop/products/products.container";
import ShopLayout from "@features/ui/shop.layout";
import { NextPageWithLayout } from "pages/_app";

const ProductsPage: NextPageWithLayout = () => {
  return <ProductsContainer />;
};

ProductsPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default ProductsPage;
