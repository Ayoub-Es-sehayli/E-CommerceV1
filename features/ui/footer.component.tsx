import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <footer className="daisy-footer place-items-center gap-4 p-4 bg-black text-white font-normal font-serif items-center">
        <div className="place-items-center">
          <Link href="/shop">
            <a>
              <Image
                src="/static/logo-no-bg.png"
                width={250}
                height={125}
                objectFit="cover"
                alt="Parafait"
              />
            </a>
          </Link>
          <div className="flex gap-3">
            <a href="https://web.whatsapp.com/send?l=fr&phone=+212600555558&text=%20hello">
              <i className="bi bi-whatsapp text-lg" />
            </a>
            <a href="https://www.instagram.com/parafait">
              <i className="bi bi-instagram text-lg" />
            </a>
          </div>
        </div>
        <div>
          <p className="font-bold text-lg text-light">Site Map</p>
          <Link href="/shop">
            <a className="daisy-link daisy-link-hover font-normal text-base">
              Accueil
            </a>
          </Link>
          <Link href="/shop/categories">
            <a className="daisy-link daisy-link-hover font-normal text-base">
              Categories
            </a>
          </Link>
          <Link href="/shop/Marques">
            <a className="daisy-link daisy-link-hover font-normal text-base">
              Marques
            </a>
          </Link>
        </div>
        <div>
          <p className="font-bold text-lg text-light">Votre Espace</p>

          <Link href="/shop/profile">
            <a className="daisy-link daisy-link-hover font-normal text-base">
              Mon Profile
            </a>
          </Link>

          <Link href="/shop/favourites">
            <a className="daisy-link daisy-link-hover font-normal text-base">
              Mes Favoris
            </a>
          </Link>

          <Link href="/shop/orders">
            <a className="daisy-link daisy-link-hover font-normal text-base">
              Mes Commandes
            </a>
          </Link>
        </div>
        <div>
          <p className="font-bold text-lg text-light">Restons en Contact</p>

          <a href="mailto:business@parafait.shop">
            <span className="font-bold text-sm">Email:</span>{" "}
            business@parafait.shop
          </a>

          <a href="tel:+21260090063">
            <span className="font-bold text-sm">Tél:</span> +21260090063
          </a>

          <p>
            <span className="font-bold text-sm">Adresse: </span>
            Somewhere in Témara....
          </p>
        </div>
      </footer>
      <footer className="daisy-footer daisy-footer-center p-1 text-xs">
        <span>© Copyright - Parafait 2022</span>
      </footer>
    </div>
  );
}
