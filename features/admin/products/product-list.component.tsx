import Spinner from "@features/ui/spinner.component";
import React from "react";
import ProductItem from "./product-item.component";
import useProducts from "./useProducts.hook";

export default function ProductList() {
  const { products, isLoading } = useProducts();
  return (
    <section>
      {isLoading ? (
        <Spinner isLoading />
      ) : !products.length ? (
        <div className="flex justify-center">
          Il n'ya aucun produit dans la base
        </div>
      ) : (
        <table className="daisy-table w-full text-left">
          <thead>
            <th className="max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Produit
            </th>
            <th>Marque</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Date d'arrivage</th>
            <th>Solde</th>
            <th></th>
          </thead>
          <tbody>
            {products.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      )}
    </section>
  );
}
