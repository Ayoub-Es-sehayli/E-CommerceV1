import Link from "next/link";
import { UseHierarchicalMenuProps } from "react-instantsearch-hooks-web";
import NavItem from "./sidebar-navitem.component";
import useNav from "./useNav.hook";

export function SideBar(algoliaProps: UseHierarchicalMenuProps) {
  const { isLoggedIn, categories, refine, Logout } = useNav(algoliaProps);
  return (
    <section className="daisy-drawer-side lg:hidden text-base capitalize font-bold">
      <label htmlFor="nav-drawer" className="daisy-drawer-overlay"></label>
      <div className="grid grid-flow-row grid-rows-[min-content_1fr_min-content] w-80 bg-white shadow-xl shadow-primary-600 lg:shadow-none">
        <label
          htmlFor="nav-drawer"
          className={
            "flex gap-1 p-4 align-center justify-left items-center border-none bg-primary-400 text-white"
          }
        >
          <i className="bi bi-list text-xl" />
          <span>Menu</span>
        </label>
        {/* Categories */}
        <ul
          role="list"
          aria-label="Primary"
          className="flex flex-col mt-2 space-y-2 px-2 align-middle"
        >
          {categories.map((category) => (
            <NavItem key={category.id} category={category} refine={refine} />
          ))}
        </ul>
        {/* User Controls */}
        <ul role="list" aria-label="User" className="p-2">
          <li>
            <Link href="">
              <a className="flex gap-2 bg-transparent focus:bg-light px-2 py-1 rounded-lg ">
                <i className="bi bi-person text-lg" />
                <span>Mon Profile</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/shop/cart">
              <a className="flex gap-2 bg-transparent focus:bg-light px-2 py-1 rounded-lg">
                <i className="bi bi-bag text-lg" />
                <span>Mon Panier</span>
              </a>
            </Link>
          </li>
          {/* <li>
            <Link href="">
              <a className="flex gap-2 bg-transparent focus:bg-light px-2 py-1 rounded-lg">
                <i className="bi bi-heart text-lg" />
                <span>Mes Favories</span>
              </a>
            </Link>
          </li> */}
          <li>
            {isLoggedIn ? (
              <button
                onClick={Logout}
                className="flex gap-2 bg-transparent focus:bg-light px-2 py-1 rounded-lg"
              >
                Se Déconnecter
              </button>
            ) : (
              <Link href="/session/login">
                <a className="flex gap-2 bg-transparent focus:bg-light px-2 py-1 rounded-lg">
                  <i className="bi bi-person text-lg" />
                  Se Connecter
                </a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
}
