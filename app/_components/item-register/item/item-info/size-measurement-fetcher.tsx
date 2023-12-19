"use client";
import useSizeMeasurementIndex from "@/app/_api/item_register/form/useSizeMeasurementIndex";
import { TMeasurement } from "@/app/_api/items/itemsShowResponse";
import { TOption } from "@/app/_api/judge_throw_away/getJudgeThrowAwayOptions";
import LoadingDialog from "@/app/_components/common/dialog/loading-dialog";
import {
  TCreateOrUpdateActionValue,
  TSize,
} from "../../item-register-container";
import ItemInfoContainer from "./item-info-container";
import { TItemData } from "./item-info-list";

export type TSizeMeasurementFetcherProps = {
  stockingOrderId: number;
  itemData: TItemData[];
  copiedItemMeasurementData: TMeasurement;
  itemImagePath: string;
  adminOptions: TOption[];
  onCloseItemInfo: () => void;
  onCreateOrUpdateCardState: (args: TCreateOrUpdateActionValue) => void;
};

type TProps = TSizeMeasurementFetcherProps & {
  itemId: number;
  adminId: number;
};

export default function SizeMeasurementFetcher({
  stockingOrderId,
  itemData,
  copiedItemMeasurementData,
  itemImagePath,
  adminOptions,
  onCloseItemInfo,
  onCreateOrUpdateCardState,
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
      copiedItemMeasurementData={copiedItemMeasurementData}
      itemImagePath={itemImagePath}
      adminOptions={adminOptions}
      arrivalSize={data.input.size as TSize}
      stockingOrderId={stockingOrderId}
      onCloseItemInfo={onCloseItemInfo}
      onCreateOrUpdateCardState={onCreateOrUpdateCardState}
      itemId={data.itemId}
      adminId={adminId}
    />
  );
}
