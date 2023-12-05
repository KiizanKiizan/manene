import { DROP_SIZE } from "@/app/_constants/drop-size";
import { useGetRequest } from "../../useGetRequest";

type TParams = {
  id: string;
};

type TPreregisteredItem = {
  mCateSmallId: number; //使った
  mBrandId: number; //使った
  mColorId: number; //使った
  mSubColorId?: number; //使った
  mPatternId: number; //使った
  mLogoId: number; //使った
  dropSize: keyof typeof DROP_SIZE; //使った
  isMarriage: boolean;
  isElasticBand: boolean;
  itemImageUrl: string;
};

export type TPreregisteredDataResponse = {
  tPreregisteredItem: TPreregisteredItem;
  tStockingOrderId: number; //使った
  smallRefItemId?: number; //使った
  mediumRefItemId?: number; //使った
  largeRefItemId?: number; //使った
  extraLargeRefItemId?: number; //使った
};

export default function usePreregisteredDataShow(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TPreregisteredDataResponse,
    TParams
  >({ path: `/preregistered_data/${params.id}` });

  return { data, error, isLoading };
}
