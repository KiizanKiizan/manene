import { useGetRequest } from "../useGetRequest";

export type TItemLocationsItemScanResponse = {
  id: number;
  size?: string;
  itemImageUrl: string;
  mCateSmall: {
    id: number;
    name: string;
  };
  mLocation?: {
    id: number;
    name: string;
  };
};

type TParams = {
  itemId: number;
};

export default function useItemLocationsItemScan(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TItemLocationsItemScanResponse,
    TParams
  >({ path: "item_locations/item_scan", params });

  return { data, error, isLoading };
}
