import ProductCard from "@features/ui/product-card.component";
import React from "react";

export default function ProductList() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-stretch">
          {arr.map((i) => {
            return <ProductCard key={i} />;
          })}
        </div>
      </section>
    </section>
  );
}
