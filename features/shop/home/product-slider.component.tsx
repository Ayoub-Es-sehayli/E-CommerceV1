import ProductCard from "@features/ui/product-card.component";
import { ProductCardModel } from "@features/ui/useProduct";

type Props = {
  title: string;
  items: ProductCardModel[];
};
export function ProductSlider({ title, items }: Props) {
  return (
    <section className="flex flex-col space-y-2">
      <div className="flex justify-between md:justify-start">
        <h2 className="peer font-serif font-bold text-lg">{title}</h2>
        <button className="border border-grey-400 rounded-2xl lg:border-none lg:p-0 p-1 peer-focus:border-black peer-focus:bg-grey-400 peer-focus:text-white focus:border-black focus:bg-grey-400 focus:text-white hover:border-black hover:bg-grey-400 hover:text-white">
          <span className="inline lg:hidden">Voir plus</span>
          <i className="hidden lg:inline bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="inline-flex overflow-auto font-sans gap-2">
        {items.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </section>
  );
}
