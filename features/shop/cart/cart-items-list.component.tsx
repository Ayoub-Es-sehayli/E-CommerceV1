import { CartItem as CartItemModel } from "@store/cart.slice";
import { FieldArray } from "formik";
import Link from "next/link";
import CartItem from "./cart-item.component";

type Props = {
  items: CartItemModel[];
  total: number;
};
export default function CartItemsList({ items, total }: Props) {
  return (
    <section className="flex flex-col md:w-2/3 lg:w-6/12 gap-2 md:gap-4">
      {items.length ? (
        <>
          <FieldArray name="items">
            {(arrayHelpers) =>
              items.map((item, index) => (
                <CartItem
                  name={`items.${index}`}
                  item={item}
                  key={item.id}
                  index={index}
                  arrayHelpers={arrayHelpers}
                />
              ))
            }
          </FieldArray>
          <span className="flex justify-between p-2 text-lg font-bold bg-light">
            <h3>
              Total <span className="font-normal text-sm">(4 articles)</span>
            </h3>
            <span>{total} DH</span>
          </span>
        </>
      ) : (
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">
            Vous n'avez aucun produits dans votre panier
          </h2>
          <Link href="/shop/products">
            <a className="underline text-primary-400">
              Consulter notre catalogue
            </a>
          </Link>
        </div>
      )}
    </section>
  );
}
