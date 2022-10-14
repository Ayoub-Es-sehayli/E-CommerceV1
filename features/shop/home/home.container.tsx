import { ProductCardModel } from "@features/ui/useProduct";
import Head from "next/head";
import { Carousel } from "./carousel.component";
import CategoryGrid from "./category-grid.component";
import { Hero } from "./hero.component";
import { ProductSlider } from "./product-slider.component";

export function HomeContainer() {
  const latest: ProductCardModel[] = [];
  const onSale: ProductCardModel[] = [];
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

        <ProductSlider title="Nouveautés" items={latest} />
        <ProductSlider title="En Promotion" items={onSale} />
      </div>
    </>
  );
}
