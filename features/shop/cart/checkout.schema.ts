import * as yup from "yup";

const ProductSchema = yup.object({
  id: yup.string().required(),
  quantity: yup.number().required().min(1),
});
const ShippingSchema = yup
  .object({
    address: yup.string().required("Vous devez inserer une addresse"),
    city: yup.string().required("Vous devez inserer une ville"),
  })
  .required();
export const CheckoutFormSchema = yup.object({
  items: yup
    .array()
    .of(ProductSchema)
    .required()
    .min(1, "Vous n'avez aucun produit dans votre panier"),
  shipping: ShippingSchema,
});
type CheckoutFormModel = yup.InferType<typeof CheckoutFormSchema>;
export default CheckoutFormModel;
