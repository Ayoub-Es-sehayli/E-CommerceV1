import { addToCart } from "@store/cart.slice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getDownloadURL, ref } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { firebaseStorage } from "services/firebase-service";
import useBrandSelector from "./useBrandSelector.hook";
import useCategorySelector from "./useCategorySelector.hook";
import useThumbnail from "./useThumbnail.hook";
type ProductBase = {
  name?: string;
  thumbnail?: string;
  brand?: string;
  price?: number;
  salePrice?: number;
  salePercentage?: number;
  description?: string;
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
  const getThumbnail = useThumbnail();
  const getCategoryById = useCategorySelector();
  const getBrandById = useBrandSelector();
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
      const thumbnailPromise =
        item.thumbnail !== product.thumbnail
          ? getThumbnail(item.thumbnail)
          : Promise.resolve(product.thumbnail);
      thumbnailPromise.then((url) => {
        const product: ProductCardModel = {
          id: item.objectID,
          thumbnail: url,
          name: item.name as string,
          category: item.category.lvl2
            ? item.category.lvl2.split(" | ")[2]
            : item.category.lvl1
            ? item.category.lvl1.split(" | ")[1]
            : item.category.lvl0
            ? item.category.lvl0
            : getCategoryById(item.category),
          brand: getBrandById(item.brand),
          price: item.price as number,
          salePercentage: item.salePercentage as number,
          salePrice: item.price
            ? item.price - Math.ceil(item.price * (item.salePercentage / 100))
            : undefined,
          description: item.description,
        };
        setProduct(product);
        setIsLoading(false);
      });
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
