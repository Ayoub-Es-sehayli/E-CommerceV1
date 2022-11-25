import * as yup from "yup";
export const ProductSchema = yup.object({
  name: yup.string().required("Donner le nom du produit").default(""),
  thumbnailUrl: yup.string().optional(),
  thumbnail: yup
    .string()
    .required("Choisir une image pour le produit")
    .default(""),
  price: yup.number().required().min(1, "Le prix doix être supérieur à 0 DH"),
  category: yup.string().required("Merci de choisir une categorie").default(""),
  brand: yup.string().required().default("Merci de choisir une marque"),
  quantity: yup.number().min(0).default(0),
  salePercentage: yup.number().min(0).default<number>(0),
  description: yup.string(),
});

export type ProductBaseModel = yup.InferType<typeof ProductSchema>;
