type Props = {
  message: string;
};

export default function CustomErrorMessage({ message }: Props) {
  return <span className="text-accent text-sm">{message}</span>;
}
