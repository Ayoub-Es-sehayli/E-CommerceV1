import { useRouter } from "next/router";
import { SearchBox } from "react-instantsearch-hooks-web";
import Modal from "../modal.component";

export default function SearchBar() {
  const { push } = useRouter();

  const handleSearch = () => {
    push({
      pathname: "/shop/products",
    });
  };
  return (
    <span>
      <SearchBox
        onSubmit={handleSearch}
        searchAsYouType={false}
        placeholder="Rechercher un produit"
        classNames={{
          form: "hidden md:block border-none md:border-b md:w-auto focus-within:border-b-2 text-primary-400",
          input: "outline-none border-b-2 border-black text-lg pr-3 pl-3",
          submitIcon: "stroke-primary-400",
          reset: "hidden",
        }}
      />
      <label
        htmlFor="search-modal"
        className="bi bi-search pointer-events-auto md:hidden"
      />
      <Modal
        modalName="search-modal"
        className="mt-4 place-self-start relative"
      >
        <SearchBox
          onSubmit={handleSearch}
          searchAsYouType={false}
          placeholder="Produit, Marque, Category"
          classNames={{
            form: "flex flex-col rounded-lg gap-2 bg-white border border-primary-600 p-2",
            input:
              "inline border-b-2 border-black md:hidden outline-none text-lg pr-4 pl-3",
            submit: "bg-primary-400 font-bold text-white",
            reset: "hidden",
          }}
          submitIconComponent={({ classNames }) => (
            <label htmlFor="search-modal" className={classNames.submitIcon}>
              Rechercher
            </label>
          )}
        />
      </Modal>
    </span>
  );
}
