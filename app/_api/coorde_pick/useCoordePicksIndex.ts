import { TSize } from "@/app/_components/item-register/item-register-container";
import { useGetRequest } from "../useGetRequest";

export type TCoordePicksIndexResponse = {
  id: number;
  size: TSize;
  itemImageUrl: string;
  mCateSmallName: string;
  mColorName: string;
  mBrandName: string;
  mLocationName: string;
  isPicked: boolean;
};

type TParams = {
  tChartId: number;
};

export default function useCoordePicksIndex(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TCoordePicksIndexResponse[],
    { tChartId: number }
  >({ path: "coorde_picks", params: params });

  return { data, error, isLoading };
}
