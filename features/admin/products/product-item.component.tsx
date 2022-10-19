import Link from "next/link";
import { ProductItemModel } from "./product-item.model";

type Props = {
  item: ProductItemModel;
};
export default function ProductItem({ item }: Props) {
  return (
    <tr className="odd:bg-light-200 space-x-2 hover:bg-light capitalize">
      <td className="max-w-[30ch] overflow-hidden whitespace-nowrap text-ellipsis">
        {item.name}
      </td>
      <td>{item.brand}</td>
      <td>{item.category}</td>
      <td>{item.price} DH</td>
      <td>{item.createdAt.toLocaleDateString("fr-fr")}</td>
      <td>{item.salePercentage ? item.salePercentage : 0} %</td>
      <td className="text-white flex justify-end w-full gap-1">
        <Link href={`/admin/product/${item.id}`}>
          <a className="bi bi-pencil rounded-lg p-2 bg-primary-400"></a>
        </Link>
        <button className="bi bi-trash rounded-lg p-2 bg-accent"></button>
      </td>
    </tr>
  );
}
