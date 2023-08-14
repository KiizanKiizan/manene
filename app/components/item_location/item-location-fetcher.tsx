"use client";
import useItemLocationsItemScan, {
  TItemLocationsItemScanResponse,
} from "@/app/api/item-location/useItemLocationsItemScan";
import { useEffect } from "react";
import ErrorDialog from "../common/dialog/error-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";

type TProps = {
  itemId: number;
  onSetItem: (data: TItemLocationsItemScanResponse) => void;
  onUnSetItemId: () => void;
};

export default function ItemLocationFetcher({
  itemId,
  onSetItem,
  onUnSetItemId,
}: TProps) {
  const { data, isLoading, error } = useItemLocationsItemScan({
    itemId: itemId,
  });

  useEffect(() => {
    if (data) {
      onSetItem(data);
      onUnSetItemId();
    }
  }, [data, onSetItem, onUnSetItemId]);

  if (error) return <ErrorDialog message={error.message} />;
  if (isLoading || !data) return <LoadingDialog />;
  return <></>;
}
