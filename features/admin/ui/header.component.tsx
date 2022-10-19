import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between px-8 w-screen bg-white ">
      <Link href="/admin/dashboard">
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
      <button className="bi bi-person"></button>
    </header>
  );
}
