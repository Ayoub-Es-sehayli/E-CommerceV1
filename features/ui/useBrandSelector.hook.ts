import { useAppSelector } from "@store/hooks";
import { useCallback, useEffect, useState } from "react";

export default function useBrandSelector() {
  const { brands } = useAppSelector((state) => state.UISlice);

  const getBrandById = useCallback((brandId: string) => {
    // Lookup brand in brands list
    const results = brands.filter((brand) => brand.id === brandId);
    return results.length ? results[0].name : "";
  }, []);

  return getBrandById;
}
