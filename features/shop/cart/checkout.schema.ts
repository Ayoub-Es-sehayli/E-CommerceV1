import EOrderStatus from "@features/ui/order-status.enum";
import { Timestamp } from "firebase/firestore";
import * as yup from "yup";

const ProductSchema = yup.object({
  id: yup.string().required(),
  quantity: yup.number().required().min(1),
});
const RecipientSchema = yup.object({
  firstName: yup.string().required("Votre nom est requis!"),
  lastName: yup.string().required("Votre prénom est requis!"),
  tel: yup.string().required("Votre numéro de télephone est requis!").min(10),
});
const ShippingSchema = yup
  .object({
    address: yup.string().required("Vous addresse est requis!"),
    city: yup.string().required("Vous ville est requis!"),
  })
  .required();
export const CheckoutFormSchema = yup.object({
  items: yup
    .array()
    .of(ProductSchema)
    .required()
    .min(1, "Vous n'avez aucun produit dans votre panier"),
  shipping: ShippingSchema,
  recipient: RecipientSchema,
});
type CheckoutFormModel = yup.InferType<typeof CheckoutFormSchema> & {
  clientId?: string;
  status?: {
    type: EOrderStatus;
    date: Timestamp;
  };
};
export default CheckoutFormModel;
