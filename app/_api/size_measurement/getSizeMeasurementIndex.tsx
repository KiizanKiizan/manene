import getNoCacheData from '../getNoCacheData';

export type TMeasurment = {
  part: number;
  value: number;
};

export type TMeasurementInput = {
  mCateSmallId: number;
  size: string;
  measurements: TMeasurment[];
  needPartsForSizeCalc: number[];
  isSizeStable: boolean;
  rank: string;
};

type TParams = { itemId: number };
export type TgetSizeMeasurementIndex = {
  itemId: number;
  input: TMeasurementInput;
};

export default async function getSizeMeasurementIndex(params: TParams) {
  return await getNoCacheData<TgetSizeMeasurementIndex, TParams>({
    path: 'size_measurement',
    params: params,
  });
}
