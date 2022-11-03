import { Field, FieldAttributes, FieldHelperProps } from "formik";
import { HTMLProps } from "react";
import CustomErrorMessage from "./error-message.component";

type Props = HTMLProps<HTMLInputElement> & {
  name: string;
  classNames?: {
    root?: string;
    field?: string;
  };
};
export default function CustomField(props: Props) {
  const { label, name, classNames, children } = props;
  const htmlProps = props as HTMLProps<HTMLInputElement>;
  return (
    <span
      className={classNames?.root ? classNames?.root : "flex flex-col gap-1"}
    >
      <label htmlFor={name} className="font-bold">
        {label}
      </label>
      <Field
        className={
          "rounded-lg border p-2 focus:outline-2 focus:outline-primary-600 text-lg text-black " +
          classNames?.field
        }
        {...htmlProps}
      >
        {children}
      </Field>
      <CustomErrorMessage {...props} />
    </span>
  );
}
