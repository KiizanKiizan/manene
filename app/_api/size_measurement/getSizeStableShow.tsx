import fetchData from '../fetchData';

type TParams = { itemId: number };
export type TGetSizeMeasurementIndexResponse = {
  isSizeStableAfterMeasurement: boolean;
};

export default async function getSizeStableShow(params: TParams) {
  return fetchData<TGetSizeMeasurementIndexResponse, TParams>({
    path: `items/${params.itemId}/size_stable_count`,
    params: params,
  });
}
