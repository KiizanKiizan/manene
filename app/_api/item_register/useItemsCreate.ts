import { TItemsShowResponse } from "../items/itemsShowResponse";
import { TSizePartsParams } from "../size_measurement/useSizeMeasurementUpdate";
import { usePostRequest } from "../usePostRequest";

export type TCreateOrUpdateParams = {
  id?: number;
  sizeAttributes: {
    tAdminId: number;
    size: string;
    tStockingOrderId: number;
    originalSize: number;
  } & TSizePartsParams;
};

export default function useItemsCreate() {
  const { mutate, error, isLoading } = usePostRequest<
    Omit<TCreateOrUpdateParams, "id">,
    TItemsShowResponse
  >({
    path: "items",
  });

  return { mutate, error, isLoading };
}
