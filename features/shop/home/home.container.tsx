import ProductCard from "@features/ui/product-card.component";
import Head from "next/head";
import Link from "next/link";
import { Carousel } from "./carousel.component";
import CategoryGrid from "./category-grid.component";
import { Hero } from "./hero.component";

export function HomeContainer() {
  return (
    <>
      <Head>
        <title>Parafait Online Store</title>
      </Head>
      <div className="flex flex-col space-y-6">
        <section className="bg-light rounded-2xl">
          <Carousel />
          <Hero />
        </section>
        <section className="flex flex-col gap-4 md:mx-auto md:w-8/12 font-serif font-bold text-primary-600 text-lg md:text-xl">
          <CategoryGrid />
        </section>
        <section className="flex flex-col space-y-2">
          <div className="flex justify-between md:justify-start">
            <h2 className="peer font-serif font-bold text-lg">
              Nouveaux Produits
            </h2>
            <button className="border border-grey-400 rounded-2xl lg:border-none lg:p-0 p-1 peer-focus:border-black peer-focus:bg-grey-400 peer-focus:text-white focus:border-black focus:bg-grey-400 focus:text-white hover:border-black hover:bg-grey-400 hover:text-white">
              <span className="inline lg:hidden">Voir plus</span>
              <i className="hidden lg:inline bi bi-chevron-right"></i>
            </button>
          </div>
          <div className="flex overflow-auto font-sans gap-2">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>
        <section className="flex flex-col space-y-2">
          <div className="flex justify-between md:justify-start">
            <h2 className="peer font-serif font-bold text-lg">En Promotion</h2>
            <button className="border border-grey-400 rounded-2xl lg:border-none lg:p-0 p-1 peer-focus:border-black peer-focus:bg-grey-400 peer-focus:text-white focus:border-black focus:bg-grey-400 focus:text-white hover:border-black hover:bg-grey-400 hover:text-white">
              <span className="inline lg:hidden">Voir plus</span>
              <i className="hidden lg:inline bi bi-chevron-right"></i>
            </button>
          </div>
          <div className="flex overflow-auto font-sans gap-2">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>
      </div>
    </>
  );
}
