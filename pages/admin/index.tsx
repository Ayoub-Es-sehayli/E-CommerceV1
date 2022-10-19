import AdminLayout from "@features/admin/ui/admin.layout";
import LoginContainer from "@features/admin/session/login.container";
import { NextPageWithLayout } from "pages/_app";

const LoginPage: NextPageWithLayout = () => {
  return <LoginContainer />;
};

LoginPage.getLayout = function getLayout(page) {
  return (
    <div className="flex justify-center items-center h-screen bg-light">
      {page}
    </div>
  );
};

export default LoginPage;
