import getNoCacheData from "../getNoCacheData";
import { TItemMaster } from "../item-location/useItemLocationsItemScan";

export type TDetail = {
  id: number;
  name: string;
  itemParts: TItemMaster[];
};

export type TWastedReason = {
  id: number;
  name: string;
  details: TDetail[];
};

type TWastedReasonsResponse = {
  wastedReasons: TWastedReason[];
};

type TParams = {
  itemId: number;
};

export default async function getWastedReasonIndex(params: TParams) {
  return await getNoCacheData<TWastedReasonsResponse>({
    path: `items/${params.itemId}/wasted_reason`,
  });
}
