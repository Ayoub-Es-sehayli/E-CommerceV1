import { useEffect, useState } from "react";
import { firebaseStorage } from "services/firebase-service";
import { ref, getDownloadURL } from "firebase/storage";
type ProductBase = {
  name?: string;
  thumbnail?: string;
  brand?: string;
  price?: number;
  salePrice?: number;
  salePercentage?: number;
  createdAt?: string;
};
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
  const [product, setProduct] = useState<ProductCardModel>({
    id: "",
  });
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
        }
      );
    }, [item]);
  } catch (error) {
    console.log(error);
  }
  return { product };
}
