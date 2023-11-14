import getNoCacheData from '../getNoCacheData';
import { TItemsShowResponse, TParams } from '../items/itemsShowResponse';

export default async function getItemsShow(params: TParams) {
  return await getNoCacheData<TItemsShowResponse>({
    path: `items/${params.id}`,
  });
}
