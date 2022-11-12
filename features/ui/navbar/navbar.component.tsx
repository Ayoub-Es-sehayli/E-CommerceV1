import useSession from "@features/session/useSession.hook";
import Image from "next/image";
import Link from "next/link";
import NavItem from "./navitem.component";
import SearchBar from "./searchbar.component";

export default function NavBar() {
  const { isLoggedIn, Logout } = useSession();
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
