import { TSizeMeasurementFetcherProps } from "./size-measurement-fetcher";

type TProps = TSizeMeasurementFetcherProps & {
  itemId?: number;
  adminId?: number;
  arrivalSize?: string;
};
export default function SizeMeasurementSwitcher({
  stockingOrderId,
  itemData,
  itemImagePath,
  adminOptions,
  onCloseItemInfo,
  itemId,
  adminId,
  arrivalSize,
}: TProps) {
  return <></>;
}
