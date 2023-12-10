"use client";
import useSizeMeasurementInputsIndex from "@/app/_api/item_register/form/useSizeMeasurementInputsIndex";
import LoadingDialog from "@/app/_components/common/dialog/loading-dialog";
import ItemInfoContainer from "./item-info-container";
import { TSizeMeasurementFetcherProps } from "./size-measurement-fetcher";

type TProps = TSizeMeasurementFetcherProps & {
  arrivalSize: string;
};

export default function SizeMeasurementInputsFetcher({
  stockingOrderId,
  itemData,
  itemImagePath,
  adminOptions,
  onCloseItemInfo,
  onCreateOrUpdateCardState,
  arrivalSize,
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
      stockingOrderId={stockingOrderId}
      onCloseItemInfo={onCloseItemInfo}
      onCreateOrUpdateCardState={onCreateOrUpdateCardState}
      arrivalSize={arrivalSize}
    />
  );
}