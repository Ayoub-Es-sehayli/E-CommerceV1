import { FieldHookConfig, useField } from "formik";
import { HTMLProps } from "react";

type Props = HTMLProps<HTMLInputElement> &
  FieldHookConfig<number> & {
    decrement: () => void;
    increment: () => void;
  };
export default function NumberInput(props: Props) {
  const { min, max, step, increment, decrement } = props;
  const [{ value }, meta, { setValue }] = useField<number>(props);
  const handleDecrement = () => {
    if (min && min == value) {
      return;
    }
    decrement();
    setValue((value as number) - (step ? (step as number) : 1));
  };
  const handleIncrement = () => {
    if (max && max == value) {
      return;
    }
    increment();
    setValue(value + (step ? (step as number) : 1));
  };
  return (
    <div className="flex gap-3 border border-primary-200 px-3 justify-between rounded-lg">
      <button
        type="button"
        disabled={value == 1}
        className="font-bold text-xl"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="font-bold place-self-center">{value}</span>
      <button
        type="button"
        className="font-bold text-xl"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
