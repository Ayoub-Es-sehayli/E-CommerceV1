import { Category } from "@store/ui.slice";
import Link from "next/link";
import { useCallback } from "react";
import { useInstantSearch } from "react-instantsearch-hooks-web";
type Props = {
  category: Category;
  // & {
  //   prevTarget?: string;
  // level: number
  // };
};
function NavSubItem({ category }: Props) {
  return (
    <li className="bg-transparent hover:bg-grey-200 px-2 py-1 text-base">
      <Link href={`/shop/products?category%5B0%5D=${category.name}`}>
        <a>{category.name}</a>
      </Link>
      {/* {category.subcategories && category.subcategories.length ? (
        <ul className="text-sm">
          {category.subcategories.map((sub) => (
            <NavSubItem
              key={sub.id}
              category={{
                ...sub,
                prevTarget: `${
                  category.prevTarget
                }&category${encodeURIComponent(
                  `[${category.level}]`
                )}=${encodeURIComponent(category.name)}`,
                level: category.level! + 1,
              }}
            />
          ))}
        </ul>
      ) : null} */}
    </li>
  );
}
export default function NavItem({ category }: Props) {
  return (
    <li className="daisy-dropdown daisy-dropdown-hover text-lg">
      <label tabIndex={0}>
        <Link href={`/shop/products?category%5B0%5D=${category.name}`}>
          <a className=" bg-transparent hover:bg-light p-1 m-1 lg:rounded-lg">
            {category.name}
          </a>
        </Link>
      </label>
      {category.subcategories && category.subcategories.length ? (
        <ul
          tabIndex={0}
          className="daisy-dropdown-content w-auto p-4 whitespace-nowrap rounded-xl grid grid-rows-6 gap-2 grid-flow-col grid-cols-[repeat(3, minmax(0, max-content))] bg-white border-primary-200 border text-primary-600"
        >
          {category.subcategories.map((sub) => (
            <NavSubItem
              key={sub.id}
              category={{
                ...sub,
                // prevTarget: `category${encodeURIComponent(
                //   `[0]`
                // )}=${encodeURIComponent(category.name)}`,
              }}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
