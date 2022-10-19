import { ProductBaseModel } from "./product.schema";

export type ProductDbModel = ProductBaseModel & {
  objectID?: string;
};
export type ProductSearchModel = ProductBaseModel & {
  objectID?: string;
  category: {
    lvl0: string;
    lvl1?: string;
    lvl2?: string;
  };
};
