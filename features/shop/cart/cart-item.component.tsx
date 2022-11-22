import Modal from "@features/ui/modal.component";
import NumberInput from "@features/ui/number-input.component";
import { Field } from "formik";
import useCartItem, { CartItemProps } from "./useCartItem";

export default function CartItem(props: CartItemProps) {
  const { item, total, index, DecreaseQuantity, IncreaseQuantity, RemoveItem } =
    useCartItem(props);

  return (
    <article className="flex border border-primary-400 rounded-xl py-2 pr-2 relative">
      <label
        htmlFor="cart-remove-modal"
        className="absolute top-2 right-2 bi bi-trash text-accent"
      />
      <figure>
        <img className="max-h-28" src={item.thumbnail} alt="Thumbnail" />
      </figure>
      <span className="flex flex-col gap-2 grow">
        <header>
          <h3 className="font-bold max-w-[20ch] lg:max-w-[38ch] overflow-hidden whitespace-nowrap text-ellipsis">
            {item.name}
          </h3>
          <p className="text-grey-400 capitalize">{item.category}</p>
        </header>
        <div className="flex justify-around">
          <span
            className={`${item.salePrice ? "line-through text-grey-400" : ""}`}
          >
            {item.price} DH
          </span>
          <span
            className={`text-primary-200 ${item.salePrice ? "" : "hidden"}`}
          >
            {item.salePrice ? `${item.salePrice} DH` : ""}
          </span>
        </div>
        <footer className="flex justify-between">
          <p className="font-bold">{total} DH</p>
          <Field type="hidden" name={`items.${index}.id`} />
          <NumberInput
            name={`items.${index}.quantity`}
            increment={IncreaseQuantity}
            decrement={DecreaseQuantity}
            min={1}
          />
        </footer>
      </span>
      <Modal
        modalName="cart-remove-modal"
        className="flex flex-col w-8/12 md:w-4/12 rounded-lg gap-4 bg-white border border-primary-600 p-4"
      >
        <header className="font-bold">
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
            onClick={RemoveItem}
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
