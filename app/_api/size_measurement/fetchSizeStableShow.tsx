import fetchData from "../fetchData";

type TParams = { itemId: number };

export type TSizeStableShowResponse = {
  isSizeStableAfterMeasurement: boolean;
};

export default async function fetchSizeStableShow(params: TParams) {
  return fetchData<TSizeStableShowResponse, TParams>({
    path: `items/${params.itemId}/size_stable_count`,
    params: params,
  });
}
