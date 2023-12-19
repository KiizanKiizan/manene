import fetchData from "../../fetchData";

type TParams = {
  id: number;
};

export type TPreregisteredDataCountRegisteredResponse = {
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

export default function fetchPreregisteredDataCountRegistered(params: TParams) {
  const data = fetchData<TPreregisteredDataCountRegisteredResponse, TParams>({
    path: `/preregistered_data/${params.id}/count_registered`,
  });
  return data;
}
