export default function ProductCard() {
  return (
    <article className="relative flex flex-col w-6/12 md:w-4/12 lg:w-48 pt-4 pb-3 px-3 space-y-2 border border-primary-400 rounded-lg">
      <figure className="place-self-center">
        <img
          src="/static/cerave_foaming_cleanser-removebg-preview.png"
          className="h-44 w-auto object-contain"
          alt="Thumbnail"
        />
      </figure>
      <span
        className={`absolute top-1 left-2 bg-accent text-white text-sm rounded-xl px-1`}
      >
        14 %
      </span>
      <i className={`absolute top-1 right-2 bi bi-heart`} />
      <header>
        <h3 className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
          Produit Lorem ipsum dolor sit amet consectetur.
        </h3>
        <p className="text-grey-400 capitalize">Visage</p>
      </header>
      <footer className="flex place-items-center justify-between font-bold">
        <span className={``}>163 DH</span>
        <span className={`text-primary-200`}>163 DH</span>
        <button
          className={`text-xl hover:text-primary-200 bi bi-bag-plus`}
        ></button>
      </footer>
    </article>
  );
}
