import Modal from "@features/ui/modal.component";
import Head from "next/head";
import FilterForm from "./filter-form";
import ProductList from "./product-list.component";

export default function ProductsContainer() {
  return (
    <>
      <Head>
        <title>Nos Produits</title>
      </Head>
      <section className="flex lg:gap-4 justify-center">
        {/* Filter Form */}
        <FilterForm className="hidden" />
        {/* Product List */}
        <ProductList />
        <Modal modalName="filter-modal">
          <FilterForm />
        </Modal>
      </section>
    </>
  );
}
