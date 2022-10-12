import SignInContainer from "@features/session/signin.container";
import ShopLayout from "@features/ui/shop.layout";
import { NextPageWithLayout } from "pages/_app";

const SignInPage: NextPageWithLayout = () => {
  return <SignInContainer />;
};

SignInPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};

export default SignInPage;
