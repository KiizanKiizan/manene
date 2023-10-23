import getNoCacheData from '../getNoCacheData';

type TParams = { itemId: number };
export type TGetSizeMeasurementIndexResponse = {
  isSizeStableAfterMeasurement: boolean;
};

export default async function getSizeStablShow(params: TParams) {
  return await getNoCacheData<TGetSizeMeasurementIndexResponse, TParams>({
    path: `items/${params.itemId}/size_stable_count`,
    params: params,
  });
}
