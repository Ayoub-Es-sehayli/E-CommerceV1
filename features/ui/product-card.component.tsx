import useProduct from "./useProduct";
type Props = {
  item: Record<string, any>;
};
export default function ProductCard({ item }: Props) {
  const { product } = useProduct(item);
  console.log(product);

  return (
    <article className="relative flex flex-col basis-full pt-4 pb-3 px-3 space-y-2 border border-primary-400 rounded-lg">
      <figure className="place-self-center">
        <img
          src={product.thumbnail}
          className="h-44 w-auto object-contain"
          alt="Thumbnail"
        />
      </figure>
      <span
        className={`absolute top-1 left-2 bg-accent text-white text-sm rounded-xl px-1.5 ${
          product.salePercentage ? "" : "hidden"
        }`}
      >
        14 %
      </span>
      <i
        className={`absolute top-1 right-2 bi ${
          product.liked ? "bi-heart-fill text-accent" : "bi-heart"
        }`}
      />
      <header>
        <h3 className="font-bold max-w-[20ch] overflow-hidden whitespace-nowrap text-ellipsis">
          {product.name}
        </h3>
        <p className="text-grey-400 capitalize">{product.category}</p>
      </header>
      <footer className="flex place-items-center justify-between font-bold">
        <span
          className={`${product.salePrice ? "line-through text-grey-400" : ""}`}
        >
          {product.price} DH
        </span>
        <span
          className={`text-primary-200 ${product.salePrice ? "" : "hidden"}`}
        >
          {product.salePrice ? `${product.salePrice} DH` : ""}
        </span>
        <button
          className={`text-xl hover:text-primary-200 bi ${
            product.inCart ? "bi-bag-check" : "bi-bag-plus"
          }`}
        ></button>
      </footer>
    </article>
  );
}
