import { useGetRequest } from "../useGetRequest";

export type TItemMaster = {
  id: number;
  name: string;
};

export type TItemLocationsItemScanResponse = {
  id: number;
  size: string | null;
  itemImageUrl: string;
  mCateSmall: TItemMaster;
  mLocation: TItemMaster | null;
};
type TParams = {
  itemId: number;
};

export default function useItemLocationsItemScan(params: TParams) {
  const { data, error, isLoading, refetch } = useGetRequest<
    TItemLocationsItemScanResponse,
    TParams
  >({ path: "item_locations/item_scan", params: params });

  return { data, error, isLoading, refetch };
}
