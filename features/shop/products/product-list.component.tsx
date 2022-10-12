import ProductCard from "@features/ui/product-card.component";
import React from "react";
import { Hits } from "react-instantsearch-hooks-web";

export default function ProductList() {
  return (
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
        <Hits
          classNames={{
            list: "grid grid-cols-2 md:grid-cols-4 gap-2 items-stretch",
          }}
          hitComponent={({ hit }) => <ProductCard item={hit} />}
        />
      </section>
    </section>
  );
}
