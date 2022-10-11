import CartItem from "./cart-item.component";

export default function CartItemsList() {
  return (
    <section className="flex flex-col md:w-2/3 lg:w-6/12 gap-2 md:gap-4">
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <span className="flex justify-between p-2 text-lg font-bold bg-light">
        <h3>
          Total <span className="font-normal text-sm">(4 articles)</span>
        </h3>
        <span>163 DH</span>
      </span>
    </section>
  );
}
