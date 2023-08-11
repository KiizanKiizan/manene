import { useGetRequest } from "../useGetRequest";

type TGetItemsShow = {
  id: number;
  usedCount: number;
  itemCode: string;
  isMarriage: boolean;
  isElasticBand: boolean;
  itemStatus: {
    status: number;
    name: string;
  };
  size: string | null;
  dropSize: {
    id: number;
    name: string;
  };
  regDate: string | null;
  priceTaxIn: number;
  priceRefTaxIn: number;
  shoulder: number | null;
  bust: number | null;
  waist: number | null;
  minWaist: number | null;
  maxWaist: number | null;
  hip: number | null;
  lengthArm: number | null;
  lengthTop: number | null;
  lengthWaist: number | null;
  lengthLeg: number | null;
  roundNeck: number | null;
  roundLeg: number | null;
  roundCalf: number | null;
  itemImageUrl: string;
  itemOriginalImageUrl: string;
  leeapSize: string;
  tStockingOrderId: number;
  originalSize: number;
  rank: string;
  mCateSmall: {
    id: number;
    name: string;
  };
  mBrand: {
    id: number;
    name: string;
  };
  mColor: {
    id: number;
    name: string;
  };
  mSubColor: {
    id: number;
    name: string;
  } | null;
  mPattern: {
    id: number;
    name: string;
  };
  mLogo: {
    id: number;
    name: string;
  };
  tAdmin: {
    id: number;
    name: string;
  };
  mLocation: {
    id: number;
    name: string;
  } | null;
};

type TParams = {
  id: number;
};

export default function useItemsShow(params: TParams) {
  const { id } = params;
  const { data, error, isLoading } = useGetRequest<TGetItemsShow, TParams>({
    path: `items/${id}`,
    params,
  });
  return { data, error, isLoading };
}
