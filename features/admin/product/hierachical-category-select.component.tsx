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
      <option key={0} disabled>
        Selectionner une Catégorie
      </option>
      {categories.map((category) => (
        <>
          <option className="font-bold" key={category.id} value={category.path}>
            {category.name}
          </option>
          {category.subcategories && category.subcategories.length
            ? category.subcategories.map((subcategory) => (
                <>
                  <CategoryItem key={subcategory.id} category={subcategory} />
                  {subcategory.subcategories && subcategory.subcategories.length
                    ? subcategory.subcategories.map((sub) => (
                        <CategoryItem
                          key={sub.id}
                          category={{ ...sub, name: "- " + sub.name }}
                        />
                      ))
                    : null}
                </>
              ))
            : null}
        </>
      ))}
    </CustomField>
  );
}
