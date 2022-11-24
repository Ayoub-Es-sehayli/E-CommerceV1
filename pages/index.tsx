import { HomeContainer } from "@features/shop/home/home.container";
import ShopLayout from "@features/ui/shop.layout";
import { NextPageWithLayout } from "pages/_app";

const HomePage: NextPageWithLayout = () => {
  return <HomeContainer />;
};

HomePage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default HomePage;
