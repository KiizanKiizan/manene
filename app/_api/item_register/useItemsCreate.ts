import { TSize } from "@/app/_components/item-register/item-register-container";
import { TItemsShowResponse } from "../items/itemsShowResponse";
import { TSizePartsParams } from "../size_measurement/useSizeMeasurementUpdate";
import { usePostRequest } from "../usePostRequest";

export type TSizeAttributes = {
  tAdminId: number;
  size: TSize;
  tStockingOrderId: number;
  originalSize: number;
} & TSizePartsParams;

export type TCreateOrUpdateParams = {
  id?: number;
  sizeAttributes: TSizeAttributes;
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
