import { HTMLProps } from "react";

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
        <button type="submit" className="text-black bg-white px-2 rounded-xl">
          <label htmlFor="filter-modal">Appliquer</label>
        </button>
      </span>
      <section>
        <h4>Categories</h4>
        <div className="flex flex-col">
          <label>
            <input type="radio" name="category" className="mx-2" />
            Visage <span className="text-primary-200">[1]</span>
          </label>
        </div>
      </section>
      <section>
        <h4>Marques</h4>
        <div className="flex flex-col">
          <label>
            <input type="checkbox" name="brand" className="mx-2" />
            CeraVe <span className="text-primary-200">[1]</span>
          </label>
          <label>
            <input type="checkbox" name="brand" className="mx-2" />
            La Roche Posay <span className="text-primary-200">[1]</span>
          </label>
        </div>
      </section>
      <section>
        <h4>Gamme</h4>
        <span className="flex justify-between">
          <span>100 DH</span>
          <span>200 DH</span>
        </span>
      </section>
    </aside>
  );
}
