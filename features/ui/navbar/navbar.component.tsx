import Image from "next/image";
import Link from "next/link";
import NavItem from "./navitem.component";

export default function NavBar() {
  return (
    <nav className="text-primary-400 font-serif text-lg">
      <section className="flex w-full justify-between items-center p-4 lg:p-2">
        <label
          htmlFor="nav-drawer"
          className="btn btn-square btn-ghost lg:hidden focus:bg-light rounded-lg"
        >
          <i className="bi bi-list text-xl"></i>
        </label>
        <Link href="/shop">
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
        <span className="relative border-none md:border-b md:w-auto focus-within:border-b-2 text-primary-400">
          <input
            className="hidden md:inline outline-none text-lg pr-3 pl-3"
            placeholder="Rechercher un produit"
          />
          <i className="inline md:absolute inset-y-0 right-0 bi bi-search  pointer-events-none" />
        </span>
        <div className="hidden lg:flex gap-2">
          <Link href="#">
            <a>
              <i className="bi bi-heart " />
            </a>
          </Link>
          <Link href="/shop/cart">
            <a>
              <i className="bi bi-bag " />
            </a>
          </Link>
          <Link href="#">
            <a>
              <i className="bi bi-person " />
            </a>
          </Link>
        </div>
      </section>
      <section
        className={
          "hidden lg:flex h-auto w-auto justify-center text-base capitalize font-bold"
        }
      >
        {/* Categories */}
        <ul role="list" aria-label="Primary">
          <NavItem />
        </ul>
      </section>
    </nav>
  );
}
