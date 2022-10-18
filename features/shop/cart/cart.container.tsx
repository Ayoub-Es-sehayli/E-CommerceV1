import { Form, Formik, FormikHelpers } from "formik";
import CartItemsList from "./cart-items-list.component";
import CheckoutForm from "./checkout-form.component";
import { CheckoutFormSchema } from "./checkout.schema";
import useCart from "./useCart";

export default function CartContainer() {
  const { items: cartItems, total, handleSubmit, initialValues } = useCart();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CheckoutFormSchema}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col md:flex-row lg:justify-center gap-4">
          <CartItemsList items={cartItems} total={total} />
          <CheckoutForm submitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
