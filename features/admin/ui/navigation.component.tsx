import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLProps, useEffect, useState } from "react";

type NavItemProps = HTMLProps<HTMLAnchorElement>;

function NavItem({ href, children, className }: NavItemProps) {
  const { pathname } = useRouter();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (pathname === href) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);

  return (
    <li>
      <Link href={href!}>
        <a
          className={`${
            active ? "text-primary-400" : ""
          } flex gap-x-2 items-center bi ${className}`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
}
export default function Navigation() {
  const items: NavItemProps[] = [
    { href: "/admin/orders", children: "Commandes", className: "bi-shop" },
    { href: "/admin/products", children: "Produits", className: "bi-boxes" },
    {
      href: "/admin/annoucements",
      children: "Annonces",
      className: "bi-megaphone",
    },
  ];
  return (
    <nav className="bg-white rounded-lg w-1/5 p-4">
      <h3 className="sr-only">Navigation</h3>
      <ul className="flex flex-col gap-1 text-base">
        {items.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  );
}
