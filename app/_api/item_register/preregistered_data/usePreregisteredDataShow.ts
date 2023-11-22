import { useGetRequest } from "../../useGetRequest";

type TParams = {
  id: number;
};

type TPreregisteredItem = {
  mCateSmallId: number;
  mBrandId: number;
  mColorId: number;
  mSubColorId?: number;
  mPatternId: number;
  mLogoId: number;
  dropSize: number;
  isMarriage: boolean;
  isElasticBand: boolean;
  itemImageUrl: string;
};

type TPreregisteredDataResponse = {
  tPreregisteredItem: TPreregisteredItem;
  tStockingOrderId: number;
  smallRefItemId?: number;
  mediumRefItemId?: number;
  largeRefItemId?: number;
  extraLargeRefItemId?: number;
};

export default function usePreregisteredDataShow(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TPreregisteredDataResponse,
    TParams
  >({ path: `/preregistered_data/${params.id}` });

  return { data, error, isLoading };
}
