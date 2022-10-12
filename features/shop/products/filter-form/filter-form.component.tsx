import BrandFilter from "./brand-filter-component";
import CategoryFilter from "./category-filter.component";
import PriceFilter from "./price-filter.components";

type Props = {
  className?: string;
};
export default function FilterForm({ className }: Props) {
  return (
    <aside
      className={`lg:flex lg:basis-3/12 p-4 flex-col space-y-2 bg-primary-400 text-white h-min rounded-lg ${className}`}
    >
      <span className="flex justify-between w-full">
        <h3 className="font-bold text-xl">Filtrer</h3>
        <label
          htmlFor="filter-modal"
          className="text-black bg-white lg:hidden flex items-center px-2 rounded-xl"
        >
          Fermer
        </label>
      </span>
      <CategoryFilter />
      <BrandFilter />
      <PriceFilter />
    </aside>
  );
}
