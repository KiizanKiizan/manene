"use client";
import { TSize } from "@/app/_components/item-register/item-register-container";
import fetchData from "../fetchData";

export type TItemLocationsItemScanResponse = {
  id: number;
  size: TSize | null;
  itemImageUrl: string;
  mCateSmall: {
    id: number;
    name: string;
  };
  mLocation: {
    id: number;
    name: string;
  } | null;
};

type TParams = {
  itemId: number;
};

export default async function fetchItemLocationItemScan(params: TParams) {
  const data = await fetchData<TItemLocationsItemScanResponse, TParams>({
    path: "item_locations/item_scan",
    params: params,
  });

  return data;
}
