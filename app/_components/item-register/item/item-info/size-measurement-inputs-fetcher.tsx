"use client";
import useSizeMeasurementInputsIndex from "@/app/_api/item_register/form/useSizeMeasurementInputsIndex";
import LoadingDialog from "@/app/_components/common/dialog/loading-dialog";
import { TSize } from "../../item-register-container";
import ItemInfoContainer from "./item-info-container";
import { TSizeMeasurementFetcherProps } from "./size-measurement-fetcher";

type TProps = TSizeMeasurementFetcherProps & {
  adminId?: number;
  arrivalSize: TSize;
  copiedSize?: TSize | null;
};

export default function SizeMeasurementInputsFetcher({
  stockingOrderId,
  itemData,
  copiedItemMeasurementData,
  itemImagePath,
  adminOptions,
  onCloseItemInfo,
  onCreateOrUpdateCardState,
  adminId,
  arrivalSize,
  copiedSize,
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
      copiedItemMeasurementData={copiedItemMeasurementData}
      itemImagePath={itemImagePath}
      adminOptions={adminOptions}
      stockingOrderId={stockingOrderId}
      onCloseItemInfo={onCloseItemInfo}
      onCreateOrUpdateCardState={onCreateOrUpdateCardState}
      adminId={adminId}
      arrivalSize={arrivalSize}
      copiedSize={copiedSize}
    />
  );
}
