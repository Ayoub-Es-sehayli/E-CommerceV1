import Modal from "@features/ui/modal.component";

export default function CartItem() {
  return (
    <article className="flex border border-primary-400 rounded-xl py-2 pr-2 relative">
      <label
        htmlFor="cart-remove-modal"
        className="absolute top-2 right-2 bi bi-trash text-accent"
      />
      <figure>
        <img
          className="max-h-28"
          src="/static/cerave_foaming_cleanser-removebg-preview.png"
          alt="Thumbnail"
        />
      </figure>
      <span className="flex flex-col gap-2 grow">
        <header>
          <h3 className="font-bold max-w-[20ch] lg:max-w-[45ch] overflow-hidden whitespace-nowrap text-ellipsis">
            Produit Lorem ipsum dolor sit amet consectetur.Produit Lorem ipsum
            dolor sit amet consectetur.
          </h3>
          <p className="text-grey-400 capitalize">Visage</p>
        </header>
        <div className="flex justify-around">
          <span className={``}>163 DH</span>
          <span className={`text-primary-200`}>163 DH</span>
        </div>
        <footer className="flex justify-between">
          <p className="font-bold">163 DH</p>
          <div className="flex gap-3 border border-primary-200 px-3 justify-between rounded-lg">
            <span className="font-bold text-xl">-</span>
            <span className="font-bold place-self-center">10</span>
            <span className="font-bold text-xl">+</span>
          </div>
        </footer>
      </span>
      <Modal
        modalName="cart-remove-modal"
        className="flex flex-col w-8/12 rounded-lg gap-4 bg-white border border-primary-600 p-4"
      >
        <header className="text-bold">
          Voulez-vous vraiment retirer cet article du panier?
        </header>
        <footer className="place-self-end">
          <label
            htmlFor="cart-remove-modal"
            className="bg-accent text-white p-2 rounded-l-lg"
          >
            Annuler
          </label>
          <label
            htmlFor="cart-remove-modal"
            className="bg-primary-400 text-white p-2 rounded-r-lg"
          >
            Ok
          </label>
        </footer>
      </Modal>
    </article>
  );
}
