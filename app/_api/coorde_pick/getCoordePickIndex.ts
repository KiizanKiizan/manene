import { TSize } from "@/app/_components/item-register/item-register-container";
import getNoCacheData from "../getNoCacheData";

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

export default async function getCoordePickIndex(params: TParams) {
  return await getNoCacheData<TCoordePicksIndexResponse[], TParams>({
    path: "coorde_picks",
    params: params,
  });
}
