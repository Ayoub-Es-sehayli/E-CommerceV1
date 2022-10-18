import CustomErrorMessage from "@features/ui/error-message.component";
import Spinner from "@features/ui/spinner.component";
import { ErrorMessage, Field } from "formik";

type Props = {
  submitting: boolean;
};
export default function CheckoutForm({ submitting }: Props) {
  return (
    <aside className="flex flex-col space-y-2 divide-y bg-primary-400 text-white h-min rounded-lg p-4">
      <h2 className="font-bold text-2xl">Passer à la caisse</h2>
      {/* Recipient */}
      <section className="flex flex-col px-2">
        <h3 className="font-bold text-lg text-light">Infomation Personnel</h3>
        <label htmlFor="recipient.lastName">Nom</label>
        <Field
          name="recipient.lastName"
          className="rounded-sm outline-none focus:outline focus:outline-primary-600 text-lg text-black p-1"
        />
        <ErrorMessage
          name="recipient.lastName"
          render={(msg) => <CustomErrorMessage message={msg} />}
        />
        <label htmlFor="recipient.firstName">Prénom</label>
        <Field
          name="recipient.firstName"
          className="rounded-sm outline-none focus:outline focus:outline-primary-600 text-lg text-black p-1"
        />
        <ErrorMessage
          name="recipient.firstName"
          render={(msg) => <CustomErrorMessage message={msg} />}
        />
        <label htmlFor="recipient.tel">Télephone</label>
        <Field
          name="recipient.tel"
          className="rounded-sm outline-none focus:outline focus:outline-primary-600 text-lg text-black p-1"
        />
        <ErrorMessage
          name="recipient.tel"
          render={(msg) => <CustomErrorMessage message={msg} />}
        />
      </section>
      {/* Shipping */}
      <section className="flex flex-col px-2">
        <h3 className="font-bold text-lg text-light">Livraison</h3>
        <label htmlFor="shipping.address">Address</label>
        <Field
          as="textarea"
          name="shipping.address"
          className="rounded-sm outline-none focus:outline focus:outline-primary-600 text-lg text-black p-1"
        />
        <ErrorMessage
          name="shipping.address"
          render={(msg) => <CustomErrorMessage message={msg} />}
        />
        <label htmlFor="shipping.city">Ville</label>
        <Field
          name="shipping.city"
          className="rounded-sm outline-none focus:outline focus:outline-primary-600 text-lg text-black p-1"
        />
        <ErrorMessage
          name="shipping.city"
          render={(msg) => <CustomErrorMessage message={msg} />}
        />
      </section>
      <button
        disabled={submitting}
        type="submit"
        className="bg-white text-black border-2 border-primary-600 flex justify-center py-2 rounded-lg hover:bg-light"
      >
        {submitting ? <Spinner isLoading /> : "Commander"}
      </button>
    </aside>
  );
}
