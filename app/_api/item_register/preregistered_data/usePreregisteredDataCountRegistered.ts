import { useGetRequest } from "../../useGetRequest";

type TParams = {
  id: number;
};

type TPreregisteredDataCountRegisteredResponse = {
  stockingId: string;
  arrivedSmallNum: number;
  arrivedMediumNum: number;
  arrivedLargeNum: number;
  arrivedExtraLargeNum: number;
  registeredSmallNum: number;
  registeredMediumNum: number;
  registeredLargeNum: number;
  registeredExtraLargeNum: number;
};

export default function usePreregisteredDataCountRegistered(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TPreregisteredDataCountRegisteredResponse,
    TParams
  >({
    path: `/preregistered_data/${params.id}/count_registered`,
  });
  return { data, error, isLoading };
}
