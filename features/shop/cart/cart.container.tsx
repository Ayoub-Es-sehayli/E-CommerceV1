import { Form, Formik, FormikHelpers } from "formik";
import CartItemsList from "./cart-items-list.component";
import CheckoutForm from "./checkout-form.component";
import CheckoutFormModel, { CheckoutFormSchema } from "./checkout.schema";
import useCart from "./useCart";

export default function CartContainer() {
  const { items: cartItems, total } = useCart();
  const initialValues: CheckoutFormModel = {
    items: cartItems.map<{ id: string; quantity: number }>((item) => {
      return { id: item.id, quantity: item.quantity };
    }),
    shipping: {
      address: "",
      city: "",
    },
  };
  const handleSubmit = (
    values: CheckoutFormModel,
    { setSubmitting }: FormikHelpers<CheckoutFormModel>
  ) => {
    console.log(values);

    setSubmitting(true);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CheckoutFormSchema}
    >
      <Form className="flex flex-col md:flex-row lg:justify-center gap-4">
        <CartItemsList items={cartItems} total={total} />
        <CheckoutForm />
      </Form>
    </Formik>
  );
}
