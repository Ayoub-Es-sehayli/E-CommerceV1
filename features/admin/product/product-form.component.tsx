import CustomField from "@features/ui/custom-field.component";
import { Brand, Category } from "@store/ui.slice";
import { Field, Form, useFormikContext } from "formik";
import { FormEvent } from "react";
import HierarchicalCategorySelect from "./hierachical-category-select.component";
import { ProductDbModel } from "./product.model";

type Props = {
  handleThumbnailReplace: (event: FormEvent<HTMLInputElement>) => void;
  categories: Category[];
  brands: Brand[];
};
export default function ProductForm(props: Props) {
  const { handleThumbnailReplace, brands, categories } = props;
  return (
    <div className="flex flex-col">
      <CustomField label="Nom du Produit" name="name" />
      <HierarchicalCategorySelect categories={categories} />
      <CustomField label="Marque" name="brand" as="select">
        <option>Selectionner une Marque</option>
        {brands.map((brand) => (
          <option className="capitalize" key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </CustomField>
      <CustomField label="Prix" name="price" type="number" />
      <CustomField label="Stock" name="quantity" type="number" />
      <CustomField
        label="Solde %"
        name="salePercentage"
        type="number"
        min={0}
        max={99}
      />
      <CustomField label="Description" name="description" as="textarea" />
      <Field type="hidden" name="thumbnail" />
      <CustomField
        label="Image"
        name="thumbnailUrl"
        type="file"
        accept="image/*"
        onChange={handleThumbnailReplace}
      />
    </div>
  );
}
