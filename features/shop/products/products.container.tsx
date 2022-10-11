import Modal from "@features/ui/modal.component";
import ProductCard from "@features/ui/product-card.component";
import Head from "next/head";
import FilterForm from "./filter-form.component";

export default function ProductsContainer() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <Head>
        <title>Nos Produits</title>
      </Head>
      <section className="flex lg:gap-4 justify-center">
        {/* Filter Form */}
        <FilterForm className="hidden" />
        {/* Product List */}
        <section className="flex flex-col gap-2 lg:basis-9/12">
          <div className="flex justify-between">
            <h2 className="font-bold text-xl">Nos Produits</h2>
            <label
              htmlFor="filter-modal"
              className="flex items-center lg:hidden text-sm px-1 border border-primary-400 rounded-lg hover:border-none hover:bg-grey-400 hover:text-white"
            >
              Filtrer
            </label>
          </div>
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-stretch">
              {arr.map((i) => {
                return <ProductCard key={i} />;
              })}
            </div>
          </section>
        </section>
        <Modal modalName="filter-modal">
          <FilterForm />
        </Modal>
      </section>
    </>
  );
}
