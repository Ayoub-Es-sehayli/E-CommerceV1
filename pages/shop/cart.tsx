import CartContainer from "@features/shop/cart/cart.container";
import ShopLayout from "@features/ui/shop.layout";
import { NextPageWithLayout } from "pages/_app";

const CartPage: NextPageWithLayout = () => {
  return <CartContainer />;
};

CartPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default CartPage;
