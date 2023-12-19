import { TItemsShowResponse } from "../items/itemsShowResponse";
import postData from "../postData";

type TParams = {
  id: number;
  createNum: number;
  tAdminId: number;
};
export default async function postItemsDuplicate(params: TParams) {
  const { id, ...restParams } = params;
  const data = await postData<TItemsShowResponse[], Omit<TParams, "id">>({
    path: `items/${id}/duplicate`,
    params: restParams,
  });

  return data;
}
