import Head from "next/head";
import Link from "next/link";
import ProductList from "./product-list.component";
import useProducts from "./useProducts.hook";

export default function ProductsContainer() {
  const { products, isLoading } = useProducts();
  return (
    <>
      <Head>
        <title>Administration Parafait - Liste des Produits</title>
      </Head>
      <div className="flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <h1 className="text-primary-400 font-bold text-xl font-serif">
            Produits
          </h1>
          <Link href="/admin/product/new">
            <a className="bi bi-plus p-2 bg-primary-200 text-white rounded-lg">
              Nouveau
            </a>
          </Link>
        </header>
        <ProductList products={products} isLoading={isLoading} />
      </div>
    </>
  );
}
