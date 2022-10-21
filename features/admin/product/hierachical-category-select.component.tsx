import CustomField from "@features/ui/custom-field.component";
import { Category } from "@store/ui.slice";

type ItemProps = {
  category: Category;
};

function CategoryItem({ category }: ItemProps) {
  return (
    <option className="text-sm pl-2" value={category.path}>
      {category.name}
    </option>
  );
}

type SelectProps = {
  categories: Category[];
};
export default function HierarchicalCategorySelect({
  categories,
}: SelectProps) {
  return (
    <CustomField
      label="Catégorie"
      name="category"
      as="select"
      classNames={{ field: "capitalize" }}
    >
      <option key={0}>Selectionner une Catégorie</option>
      {categories.map((category) => (
        <>
          <option
            className="capitalize"
            key={category.id}
            value={category.path}
          >
            {category.name}
          </option>
          {category.subcategories && category.subcategories.length
            ? category.subcategories.map((subcategory) => (
                <CategoryItem key={subcategory.id} category={subcategory} />
              ))
            : null}
        </>
      ))}
    </CustomField>
  );
}
