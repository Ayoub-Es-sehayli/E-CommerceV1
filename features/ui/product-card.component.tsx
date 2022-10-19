import Spinner from "./spinner.component";
import useProduct from "./useProduct";
type Props = {
  item: Record<string, any>;
};
export default function ProductCard({ item }: Props) {
  const { product, isLoading, AddToCart, addingToCart } = useProduct(item);

  return (
    <article className="relative flex flex-col basis-full pt-4 pb-3 px-3 space-y-2 border border-primary-400 rounded-lg">
      <figure className="h-44 w-auto place-self-center flex items-center">
        <img
          src={product.thumbnail}
          className={`h-44 w-auto object-contain ${isLoading ? "hidden" : ""}`}
          alt="Thumbnail"
        />
        <Spinner isLoading={isLoading} />
      </figure>
      <span
        className={`absolute top-1 left-2 bg-accent text-white text-sm rounded-xl px-1.5 ${
          product.salePercentage ? "" : "hidden"
        }`}
      >
        {product.salePercentage} %
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
          className={`${
            product.salePercentage ? "line-through text-grey-400" : ""
          }`}
        >
          {product.price} DH
        </span>
        <span
          className={`text-primary-200 ${
            product.salePercentage ? "" : "hidden"
          }`}
        >
          {product.salePrice ? `${product.salePrice} DH` : ""}
        </span>
        {addingToCart ? (
          <Spinner isLoading={addingToCart} />
        ) : (
          <button
            onClick={AddToCart}
            disabled={product.inCart}
            className={`text-xl hover:text-primary-200 bi ${
              product.inCart ? "bi-bag-check" : "bi-bag-plus"
            }`}
          ></button>
        )}
      </footer>
    </article>
  );
}
