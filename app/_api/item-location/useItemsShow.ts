import { TItemsShowResponse, TParams } from '../items/itemsShowResponse';
import { useGetRequest } from '../useGetRequest';

export default function useItemsShow(params: TParams) {
  const { id } = params;
  const { data, error, isLoading } = useGetRequest<TItemsShowResponse, TParams>(
    {
      path: `items/${id}`,
      params,
    }
  );
  return { data, error, isLoading };
}
