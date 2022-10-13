import { useEffect, useCallback, useState } from "react";
import { firebaseStorage } from "services/firebase-service";
import { ref, getDownloadURL } from "firebase/storage";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addToCart } from "@store/cart.slice";
type ProductBase = {
  name?: string;
  thumbnail?: string;
  brand?: string;
  price?: number;
  salePrice?: number;
  salePercentage?: number;
  createdAt?: string;
};

// TODO: Implement the hook to use this type instead of Record<string, any>
export type ProductHitModel = ProductBase & {
  objectID: string;
  category: {
    lvl0?: string;
    lvl1?: string;
    lvl2?: string;
  };
};

export type ProductCardModel = ProductBase & {
  id: string;
  category?: string;
  liked?: boolean;
  inCart?: boolean;
};

export default function useProduct(item: Record<string, any>) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductCardModel>({
    id: "",
  });
  const { items: cartItems } = useAppSelector((state) => state.CartSlice);
  const AddToCart = useCallback(() => {
    setAddingToCart(true);
    dispatch(addToCart(product));
    setAddingToCart(false);
  }, [product]);
  try {
    useEffect(() => {
      getDownloadURL(ref(firebaseStorage, `/products/${item.thumbnail}`)).then(
        (url) => {
          const product: ProductCardModel = {
            id: item.objectID,
            thumbnail: url,
            name: item.name as string,
            category: item.category.lvl0,
            brand: item.brand as string,
            price: item.price as number,
            salePercentage: 14,
            salePrice: item.price
              ? item.price - Math.ceil(item.price * (14 / 100))
              : undefined,
          };
          setProduct(product);
          setIsLoading(false);
        }
      );
    }, [item]);
    useEffect(() => {
      const itemIds = cartItems.map((c) => {
        return c.id;
      });
      setProduct({
        ...product,
        inCart: itemIds.includes(product.id),
      });
    }, [cartItems]);
  } catch (error) {
    console.log(error);
  }
  return { product, isLoading, AddToCart, addingToCart };
}
