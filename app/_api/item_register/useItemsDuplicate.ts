import { TItemsShowResponse } from "../items/itemsShowResponse";
import { usePostRequest } from "../usePostRequest";

type TParams = {
  id: number;
  createNum: number;
  tAmiId: number;
};

export default function useItemsDuplicate(params: Pick<TParams, "id">) {
  const { mutate, error, isLoading } = usePostRequest<
    Omit<TParams, "id">,
    TItemsShowResponse
  >({
    path: `items/${params.id}/duplicate`,
  });

  return { mutate, error, isLoading };
}
