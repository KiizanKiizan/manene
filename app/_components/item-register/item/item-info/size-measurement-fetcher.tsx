"use client";
import useSizeMeasurementIndex from "@/app/_api/item_register/form/useSizeMeasurementIndex";
import { TOption } from "@/app/_api/judge_throw_away/getJudgeThrowAwayOptions";
import LoadingDialog from "@/app/_components/common/dialog/loading-dialog";
import ItemInfoContainer from "./item-info-container";
import { TItemData } from "./item-info-list";

export type TSizeMeasurementFetcherProps = {
  stockingOrderId: number;
  itemData: TItemData[];
  itemImagePath: string;
  adminOptions: TOption[];
  onCloseItemInfo: () => void;
};

type TProps = TSizeMeasurementFetcherProps & {
  itemId: number;
  adminId: number;
};

export default function SizeMeasurementFetcher({
  stockingOrderId,
  itemData,
  itemImagePath,
  adminOptions,
  onCloseItemInfo,
  itemId,
  adminId,
}: TProps) {
  const { data, isLoading, error } = useSizeMeasurementIndex({
    itemId: itemId,
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
      arrivalSize={data.input.size as string}
      stockingOrderId={stockingOrderId}
      onCloseItemInfo={onCloseItemInfo}
      itemId={data.itemId}
      adminId={adminId}
    />
  );
}
