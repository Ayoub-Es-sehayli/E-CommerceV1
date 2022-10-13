import { Field } from "formik";

export default function CheckoutForm() {
  return (
    <aside className="flex flex-col space-y-2 bg-primary-400 text-white h-min rounded-lg p-4">
      <h2 className="font-bold text-2xl">Passer à la caisse</h2>
      {/* Shipping */}
      <section className="flex flex-col px-2">
        <h3 className="font-bold text-lg">Livraison</h3>
        <label htmlFor="address">Address</label>
        <Field
          as="textarea"
          name="shipping.address"
          className="rounded-sm outline-none focus:outline focus:outline-primary-600 text-lg text-black p-1"
        />
        <label htmlFor="city">Ville</label>
        <Field
          name="shipping.city"
          className="rounded-sm outline-none focus:outline focus:outline-primary-600 text-lg text-black p-1"
        />
      </section>
      <button
        type="submit"
        className="bg-white text-black border-2 border-primary-600 py-2 rounded-lg hover:bg-light"
      >
        Commander
      </button>
    </aside>
  );
}
