import getNoCacheData from "../getNoCacheData";

export type TMeasurement = {
  part: number;
  value: number | null;
};

export type TMeasurementInput = {
  mCateSmallId: number;
  size: string | null;
  measurements: TMeasurement[];
  needPartsForSizeCalc: number[];
  isSizeStable: boolean;
  rank: string;
};

export type TSizeMeasurementIndexResponse = {
  itemId: number;
  input: TMeasurementInput;
};

export type TSizeMeasurementIndexParams = { itemId: number };

export default async function getSizeMeasurementIndex(
  params: TSizeMeasurementIndexParams
) {
  return getNoCacheData<
    TSizeMeasurementIndexResponse,
    TSizeMeasurementIndexParams
  >({
    path: "size_measurement",
    params: params,
  });
}
