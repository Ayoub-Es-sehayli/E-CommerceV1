import CustomField from "@features/ui/custom-field.component";
import { Form, Formik, FormikHelpers } from "formik";
import { DateSelectionFormData } from "./order-item.model";

export default function DateSelectorForm(props: {
  initialValues: DateSelectionFormData;
  onSubmit: (
    values: DateSelectionFormData,
    {}: FormikHelpers<DateSelectionFormData>
  ) => void;
}) {
  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years: number[] = [];
  for (let i = props.initialValues.year; i >= 2022; i--) {
    years.push(i);
  }
  return (
    <Formik {...props}>
      <Form className="flex gap-2 pr-4">
        <CustomField
          name="month"
          as="select"
          classNames={{ field: "capitalize" }}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(1970, month - 1, 1).toLocaleString("fr-fr", {
                month: "long",
              })}
            </option>
          ))}
        </CustomField>
        <CustomField name="year" as="select">
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </CustomField>
        <button
          type="submit"
          className="rounded-lg border border-primary-400 bg-primary-200 text-white px-4"
        >
          Go
        </button>
      </Form>
    </Formik>
  );
}
