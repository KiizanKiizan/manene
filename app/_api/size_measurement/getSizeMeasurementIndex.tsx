import getNoCacheData from "../getNoCacheData";

export type TMeasurement = {
  part: number;
  value: number;
};

export type TMeasurementInput = {
  mCateSmallId: number;
  size: string;
  measurements: TMeasurement[];
  needPartsForSizeCalc: number[];
  isSizeStable: boolean;
  rank: string;
};

type TParams = { itemId: number };

export type TSizeMeasurementIndexResponse = {
  itemId: number;
  input: TMeasurementInput;
};

export default async function getSizeMeasurementIndex(params: TParams) {
  return getNoCacheData<TSizeMeasurementIndexResponse, TParams>({
    path: "size_measurement",
    params: params,
  });
}
