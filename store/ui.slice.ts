import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  path: string;
  name: string;
  subcategories?: Category[];
}
export interface Brand {
  id: string;
  name: string;
  productCount: number;
}
export interface UIState {
  categories: Category[];
  brands: Brand[];
}

const initialState: UIState = {
  categories: [],
  brands: [],
};

export const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<Category[]>) => {
      state.categories = payload;
    },
    setBrands: (state, { payload }: PayloadAction<Brand[]>) => {
      state.brands = payload;
    },
  },
});

export const { setBrands, setCategories } = UISlice.actions;
export default UISlice.reducer;
