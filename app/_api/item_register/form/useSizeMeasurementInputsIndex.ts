import { TMeasurementInput as TSizeMeasurementInputsIndexResponse } from "../../size_measurement/getSizeMeasurementIndex";
import { useGetRequest } from "../../useGetRequest";

type TParams = {
  stockingOrderId: number;
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
