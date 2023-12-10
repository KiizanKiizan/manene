import { DROP_SIZE } from "@/app/_constants/drop-size";
import fetchData from "../../fetchData";

type TParams = {
  id: string;
};

type TPreregisteredItem = {
  mCateSmallId: number;
  mBrandId: number;
  mColorId: number;
  mSubColorId?: number;
  mPatternId: number;
  mLogoId: number;
  dropSize: keyof typeof DROP_SIZE;
  isMarriage: boolean;
  isElasticBand: boolean;
  itemImageUrl: string;
};

export type TPreregisteredDataResponse = {
  tPreregisteredItem: TPreregisteredItem;
  tStockingOrderId: number;
  smallRefItemId: number | null;
  mediumRefItemId: number | null;
  largeRefItemId: number | null;
  extraLargeRefItemId: number | null;
};

export default function fetchPreregisteredDataShow(params: TParams) {
  const data = fetchData<TPreregisteredDataResponse, TParams>({
    path: `/preregistered_data/${params.id}`,
  });

  return data;
}
