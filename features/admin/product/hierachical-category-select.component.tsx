import CustomField from "@features/ui/custom-field.component";
import { Category } from "@store/ui.slice";

type ItemProps = {
  category: Category;
};

function CategoryItem({ category }: ItemProps) {
  return (
    <option className="italic" value={category.path}>
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
      <option disabled>Selectionner une Catégorie</option>
      {categories.map((category) => (
        <>
          <option className="font-bold" key={category.id} value={category.path}>
            {category.name}
          </option>
          {category.subcategories?.map((subcategory) => (
            <>
              <CategoryItem key={subcategory.id} category={subcategory} />
              {subcategory.subcategories?.map((sub) => (
                <CategoryItem
                  key={sub.id}
                  category={{ ...sub, name: "- " + sub.name }}
                />
              ))}
            </>
          ))}
        </>
      ))}
    </CustomField>
  );
}
