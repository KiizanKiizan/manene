import { useDeleteRequest } from "../useDeleteRequest";

type TParams = {
  id: number;
};

export default function useItemsDestroy(params: TParams) {
  const { mutate, error, isLoading } = useDeleteRequest<TParams>({
    path: `items/${params.id}`,
  });

  return { mutate, error, isLoading };
}
