import { RangeInput } from "react-instantsearch-hooks-web";

export default function PriceFilter() {
  return (
    <section>
      <h4 className="font-bold text-lg underline mb-1">Prix (DH)</h4>
      <RangeInput
        attribute="price"
        min={1}
        classNames={{
          form: "flex justify-around items-center",
          submit: "bg-white text-black p-1 rounded-lg",
          input: "p-1 rounded-xl",
        }}
      />
    </section>
  );
}
