import { HierarchicalMenu } from "react-instantsearch-hooks-web";
export default function CategoryFilter() {
  return (
    <section>
      <h4 className="font-bold text-lg underline">Categories</h4>
      <HierarchicalMenu
        attributes={["category.lvl0", "category.lvl1", "category.lvl2"]}
        classNames={{
          count: "text-primary-200",
          item: "px-2",
          label: "mr-2 capitalize",
          childList: "ml-2",
          selectedItemLink: "font-bold text-light",
        }}
        separator=" | "
        sortBy={["count:desc"]}
      />
    </section>
  );
}
