import { TItemsShowResponse } from "../items/itemsShowResponse";
import { usePatchRequest } from "../usePatchRequest";
import { TCreateOrUpdateParams } from "./useItemsCreate";

export default function useItemsUpdate(
  params: Pick<TCreateOrUpdateParams, "id">
) {
  const { mutate, error, isLoading } = usePatchRequest<
    Omit<TCreateOrUpdateParams, "id">,
    TItemsShowResponse
  >({
    path: `items/${params.id}`,
  });

  return { mutate, error, isLoading };
}
