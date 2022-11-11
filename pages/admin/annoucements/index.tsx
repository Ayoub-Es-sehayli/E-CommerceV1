import AnnoucementsContainer from "@features/admin/annoucements/annoucements.container";
import AdminLayout from "@features/admin/ui/admin.layout";
import { NextPageWithLayout } from "pages/_app";

const AnnoucementsPage: NextPageWithLayout = () => {
  return <AnnoucementsContainer />;
};

AnnoucementsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AnnoucementsPage;
