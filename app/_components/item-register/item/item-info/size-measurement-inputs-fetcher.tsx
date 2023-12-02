"use client";
import useSizeMeasurementInputsIndex from "@/app/_api/item_register/form/useSizeMeasurementInputsIndex";
import { TOption } from "@/app/_api/judge_throw_away/getJudgeThrowAwayOptions";
import LoadingDialog from "@/app/_components/common/dialog/loading-dialog";
import ItemInfoContainer from "./item-info-container";
import { TItemData } from "./item-info-list";

type TProps = {
  stockingOrderId: number;
  itemData: TItemData[];
  itemImagePath: string;
  adminOptions: TOption[];
  arrivalSize: string;
  onCloseItemInfo: () => void;
};

export default function SizeMeasurementInputsFetcher({
  stockingOrderId,
  itemData,
  itemImagePath,
  adminOptions,
  arrivalSize,
  onCloseItemInfo,
}: TProps) {
  const { data, isLoading, error } = useSizeMeasurementInputsIndex({
    stockingOrderId: stockingOrderId,
  });

  if (isLoading || !data) return <LoadingDialog isOpen />;
  if (error) {
    alert((error.response?.data as { message: string })?.message);
  }

  return (
    <ItemInfoContainer
      measurementInputData={data.input}
      itemData={itemData}
      itemImagePath={itemImagePath}
      adminOptions={adminOptions}
      arrivalSize={arrivalSize}
      stockingOrderId={stockingOrderId}
      onCloseItemInfo={onCloseItemInfo}
    />
  );
}
