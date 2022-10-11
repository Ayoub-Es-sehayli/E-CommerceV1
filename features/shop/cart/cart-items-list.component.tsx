import CartItem from "./cart-item.component";

export default function CartItemsList() {
  return (
    <section className="flex flex-col w-full md:w-2/3 gap-2 md:gap-4">
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </section>
  );
}
