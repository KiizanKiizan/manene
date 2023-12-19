import { TSize } from "@/app/_components/item-register/item-register-container";
import { TInspectionGroup } from "../inspection-groups/getInspectionGroupsIndex";
import { usePostRequest } from "../usePostRequest";

export type TItemInfo = {
  id: number;
  size: TSize;
  itemImageUrl: string;
  mCateSmallName: string;
  mColorName: string;
  mBrandName: string;
};

export type TChartItem = {
  id: number;
  itemInfo: TItemInfo;
  purchasedFlag: boolean;
  inspectionStatus: number | null;
};

export type TChart = {
  id: number;
  tMemberId: number;
  name: string;
  deliveryDate: string;
  tChartItems: TChartItem[];
};

export type TBeforeInspectionsCreateResponse = {
  tChart: TChart;
  isCreatedInspectionData: boolean;
  registeredInspectionGroup: TInspectionGroup;
  acceptingInspectionGroup: TInspectionGroup | null;
  isChartInspected: boolean;
};

type TParams = {
  itemId: number;
};
export default function useBeforeInspectionsCreate() {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<
    TParams,
    TBeforeInspectionsCreateResponse
  >({ path: "inspection/before_inspections" });

  return { mutate, error, isLoading, isSuccess };
}
