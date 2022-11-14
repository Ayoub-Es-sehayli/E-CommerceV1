import { Category } from "@store/ui.slice";
import Link from "next/link";
import { useCallback } from "react";
import { useInstantSearch } from "react-instantsearch-hooks-web";

type NavItemProps = {
  category: Category;
  refine: (value: string) => void;
};
export default function SideBarNavItem({ category, refine }: NavItemProps) {
  return (
    <li
      tabIndex={0}
      className="daisy-collapse flex flex-col space-y-1 focus-within:bg-light rounded-lg p-2"
    >
      <label className="flex justify-between items-center">
        <Link href={`/shop/products`}>
          <a
            onClick={() => refine(category.name)}
            className="daisy-collapse-title px-2"
          >
            {category.name}
          </a>
        </Link>
        <i className="bi-chevron-down" />
      </label>
      {category.subcategories && category.subcategories.length ? (
        <ul className="daisy-collapse-content w-auto ml-2 pl-2 border-l-4 border-primary-200 grid gap-1">
          {category.subcategories.map((subcategory) => (
            <li key={subcategory.id}>
              <Link href={`/shop/products`}>
                <a onClick={() => refine(category.name)}>{subcategory.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
