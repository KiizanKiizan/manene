import { useGetRequest } from "../../useGetRequest";

type TParams = {
  stockingOrderId: number;
};

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

type TSizeMeasurementInputsIndexResponse = {
  inputs: TMeasurementInput[];
};

export default function useSizeMeasurementInputsIndex(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TSizeMeasurementInputsIndexResponse,
    TParams
  >({
    path: "item/form/size_measurement_inputs",
    params: params,
  });

  return { data, error, isLoading };
}
