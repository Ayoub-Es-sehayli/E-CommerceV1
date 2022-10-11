import CartItemsList from "./cart-items-list.component";
import CheckoutForm from "./checkout-form.component";

export default function CartContainer() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <CartItemsList />
      <CheckoutForm />
    </div>
  );
}
