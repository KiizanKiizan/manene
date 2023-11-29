import {
  TSizeMeasurementIndexParams,
  TSizeMeasurementIndexResponse,
} from "../../size_measurement/getSizeMeasurementIndex";
import { useGetRequest } from "../../useGetRequest";

export default function useSizeMeasurementIndex(
  params: TSizeMeasurementIndexParams
) {
  const { data, error, isLoading } = useGetRequest<
    TSizeMeasurementIndexResponse,
    TSizeMeasurementIndexParams
  >({
    path: "size_measurement",
    params: params,
  });

  return { data, error, isLoading };
}
