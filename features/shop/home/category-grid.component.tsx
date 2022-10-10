import Link from "next/link";

export default function CategoryGrid() {
  return (
    <>
      <div className="grid gap-4 md:grid-flow-col md:grid-cols-[1.2fr_1fr_1.2fr]">
        <Link href="#">
          <a className="flex bg-light rounded-xl p-4 text-center justify-center place-items-center">
            Visage
          </a>
        </Link>
        <Link href="#">
          <a className="flex bg-light rounded-xl p-4 text-center justify-center place-items-center">
            Solaire
          </a>
        </Link>
        <Link href="#">
          <a className="flex bg-light rounded-xl p-4 text-center justify-center place-items-center">
            Hygiène
          </a>
        </Link>
      </div>
      <div className="grid gap-y-4 gap-x-2 md:grid-flow-col md:grid-cols-[1fr_1.5fr_1fr]">
        <Link href="#">
          <a className="flex bg-light rounded-xl p-4 text-center justify-center place-items-center">
            Cheveux
          </a>
        </Link>
        <Link href="#">
          <a className="flex bg-light rounded-xl p-4 text-center justify-center place-items-center">
            Bébé & Maman
          </a>
        </Link>
        <Link href="#">
          <a className="flex bg-light rounded-xl p-4 text-center justify-center place-items-center">
            Dentaire
          </a>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-flow-col md:grid-cols-[1.2fr_1fr_1.2fr]">
        <Link href="#">
          <a className="flex bg-light rounded-xl p-4 text-center justify-center place-items-center">
            Corps
          </a>
        </Link>
        <Link href="#">
          <a className="flex bg-light rounded-xl p-4 text-center justify-center place-items-center">
            Compléments Alimentaire
          </a>
        </Link>
        <Link href="#">
          <a className="flex bg-light rounded-xl p-4 text-center justify-center place-items-center">
            BIO
          </a>
        </Link>
      </div>
    </>
  );
}
