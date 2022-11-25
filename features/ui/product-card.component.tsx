import * as Dialog from "@radix-ui/react-dialog";
import Spinner from "./spinner.component";
import useProduct from "./useProduct";

export function ProductCard({
  product,
  isLoading,
  AddToCart,
  addingToCart,
}: ReturnType<typeof useProduct>) {
  return (
    <article className="max-w-[20ch] relative flex flex-col basis-full pt-4 pb-3 px-3 space-y-2 border border-primary-400 rounded-lg">
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
      {/* <i
        className={`absolute top-1 right-2 bi ${
          product.liked ? "bi-heart-fill text-accent" : "bi-heart"
        }`}
      />*/}
      <header>
        <h3 className="font-bold max-w-[20ch] overflow-hidden whitespace-nowrap text-ellipsis">
          {product.name}
        </h3>
        <p className="text-grey-400 capitalize overflow-hidden whitespace-nowrap text-ellipsis">
          {product.category}
        </p>
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

export default function ProductDetailCard({
  item,
}: {
  item: Record<string, any>;
}) {
  const productProps = useProduct(item);
  const { product, isLoading, AddToCart, addingToCart } = productProps;
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>
          <ProductCard {...productProps} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed inset-x-6 top-10 md:inset-x-1/4 lg:top-1/4 bg-white flex flex-col gap-1 px-6 py-4 border-2 border-primary-200 rounded-xl">
          <Dialog.Title className="text-xl flex justify-between items-center font-bold">
            <span>À propos de ce produit</span>
            <Dialog.Close asChild>
              <button className="bi bi-x hover:bg-grey-200 rounded-lg px-1" />
            </Dialog.Close>
          </Dialog.Title>
          <Dialog.Description className="flex gap-4 items-center flex-col lg:flex-row">
            <div className="relative flex flex-col gap-3.5">
              <figure className="h-44 md:h-60 w-auto place-self-center flex items-center">
                <img
                  src={product.thumbnail}
                  className={`h-44 md:h-60 w-auto object-contain ${
                    isLoading ? "hidden" : ""
                  }`}
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
              {addingToCart ? (
                <Spinner isLoading={addingToCart} />
              ) : (
                <button
                  onClick={AddToCart}
                  disabled={product.inCart}
                  className={`flex gap-2 px-4 py-2 text-xl text-primary-600 border border-primary-600 hover:text-white hover:bg-primary-200 w-full rounded-lg bi justify-center whitespace-nowrap`}
                >
                  <span>
                    {product.inCart ? "Dans le panier" : "Ajouter au panier"}
                  </span>
                </button>
              )}
            </div>
            <div className="font-bold">
              <h3 className="text-xl">{product.name}</h3>
              <span className="flex gap-1">
                <span>Category: </span>
                <span className="text-grey-400 capitalize">
                  {product.category}
                </span>
              </span>
              <span className="flex gap-1">
                <span>Marque: </span>
                <span className="text-grey-400 capitalize">
                  {product.brand}
                </span>
              </span>
              <span>
                <span>Description: </span>
                <br />
                <span className="text-grey-400 capitalize">
                  ;lkja;lkdsfj;lkasjdf
                </span>
              </span>
              <span className="flex justify-around">
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
              </span>
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
