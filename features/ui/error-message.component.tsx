import { ErrorMessage } from "formik";

type Props = {
  name: string;
};

export default function CustomErrorMessage({ name }: Props) {
  return (
    <ErrorMessage
      name="recipient.lastName"
      render={(message) => (
        <span className="text-accent text-sm">{message}</span>
      )}
    />
  );
}
