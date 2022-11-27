import ProductCard from "@features/ui/product-card.component";
import React, { useEffect, useState } from "react";
import {
  ClearRefinements,
  Hits,
  Pagination,
  useInstantSearch,
} from "react-instantsearch-hooks-web";

export default function ProductList() {
  const { uiState } = useInstantSearch();
  const [searchQuery, setSearchQuery] = useState<string>();
  useEffect(() => {
    setSearchQuery(uiState.dev_products.query as string);
  });
  return (
    <section className="flex flex-col gap-2 lg:basis-10/12">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">
          {searchQuery ? `Résultats pour '${searchQuery}'` : "Nos Produits"}
        </h2>
        <span className="flex gap-2">
          <ClearRefinements
            includedAttributes={["query"]}
            translations={{
              resetButtonText: "Réinitiliser",
            }}
            classNames={{
              root: "flex",
              button:
                "flex items-center bi bi-arrow-counterclockwise text-sm px-1 border border-primary-400 rounded-lg hover:border-none hover:bg-grey-400 hover:text-white",
              disabledButton: "hidden",
            }}
          />
          <label
            htmlFor="filter-modal"
            className="flex items-center lg:hidden text-sm px-1 border border-primary-400 rounded-lg hover:border-none hover:bg-grey-400 hover:text-white"
          >
            Filtrer
          </label>
        </span>
      </div>
      <section>
        <Hits
          classNames={{
            list: "grid grid-cols-2 md:grid-cols-4 gap-2",
          }}
          hitComponent={({ hit }) => <ProductCard item={hit} />}
        />
        <Pagination
          classNames={{
            list: "flex gap-4 p-4",
          }}
        />
      </section>
    </section>
  );
}
