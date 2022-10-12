import { RefinementList } from "react-instantsearch-hooks-web";

export default function BrandFilter() {
  return (
    <section>
      <h4 className="font-bold text-lg underline">Marques</h4>
      <RefinementList
        attribute="brand"
        classNames={{
          count: "text-primary-200",
          item: "px-2",
          label: "capitalize flex gap-2",
          selectedItem: "font-bold text-light",
        }}
      />
    </section>
  );
}
