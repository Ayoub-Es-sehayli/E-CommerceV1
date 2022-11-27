import Image from "next/image";
import Link from "next/link";
import { UseHierarchicalMenuProps } from "react-instantsearch-hooks-web";
import NavItem from "./navitem.component";
import SearchBar from "./searchbar.component";
import useNav from "./useNav.hook";

export default function NavBar(algoliaProps: UseHierarchicalMenuProps) {
  const { isLoggedIn, categories, refine, Logout } = useNav(algoliaProps);
  return (
    <nav className="text-primary-400 font-serif text-lg">
      <section className="flex w-full justify-between items-center p-4 lg:p-2">
        <label
          htmlFor="nav-drawer"
          className="btn btn-square btn-ghost lg:hidden focus:bg-light rounded-lg"
        >
          <i className="bi bi-list text-xl"></i>
        </label>
        <Link href="/">
          <a className="">
            <Image
              src="/static/logo.png"
              width={160}
              height={64}
              objectFit="contain"
              alt="Parafait"
            />
          </a>
        </Link>
        <SearchBar />
        <div className="hidden lg:flex gap-2">
          {/* <Link href="#">
            <a>
              <i className="bi bi-heart " />
            </a>
          </Link> */}
          <Link href="/shop/cart">
            <a>
              <i className="bi bi-bag " />
            </a>
          </Link>
          {isLoggedIn ? (
            <button
              title="Se Déconnecter"
              onClick={Logout}
              className="bi bi-box-arrow-left"
            ></button>
          ) : (
            <Link href="/session/login">
              <a title="Se Connecter">
                <i className="bi bi-person " />
              </a>
            </Link>
          )}
        </div>
      </section>
      <section
        className={
          "hidden lg:flex w-auto justify-center text-base capitalize font-bold"
        }
      >
        {/* Categories */}
        <ul role="list" aria-label="Primary">
          {categories.map((category) => (
            <NavItem key={category.id} category={category} refine={refine} />
          ))}
        </ul>
      </section>
    </nav>
  );
}
