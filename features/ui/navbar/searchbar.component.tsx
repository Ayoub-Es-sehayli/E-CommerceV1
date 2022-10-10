export default function SearchBar() {
  return (
    <span className="relative border-none md:border-b md:w-auto focus-within:border-b-2 text-primary-400">
      <input
        className="hidden md:inline outline-none border-b-2 border-black text-lg pr-3 pl-3"
        placeholder="Rechercher un produit"
      />
      <label
        htmlFor="search-modal"
        className="inline md:absolute inset-y-0 right-0 bi bi-search pointer-events-auto md:pointer-events-none"
      />
      <input type="checkbox" id="search-modal" className="daisy-modal-toggle" />
      <div className="daisy-modal">
        <div className="daisy-modal-box mt-4 place-self-start flex flex-col rounded-lg gap-2 bg-white border border-primary-600 p-2 relative">
          <label
            htmlFor="search-modal"
            className="bi bi-x absolute top-2 right-2"
          />
          <input
            className="inline border-b-2 border-black md:hidden outline-none text-lg pr-4 pl-3"
            placeholder="Rechercher un produit"
          />
          <button className="bg-primary-400 font-bold text-white">
            Rechercher
          </button>
        </div>
      </div>
    </span>
  );
}
