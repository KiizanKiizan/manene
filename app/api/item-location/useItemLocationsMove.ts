import { usePatchRequest } from "../usePatchRequest";

type TParams = {
  targetLocationId: number;
  itemIds: number[];
};

export default function useItemLocationsMove() {
  const { mutate, error, isLoading, isSuccess } = usePatchRequest<TParams>({
    path: "item_locations/move",
  });
  return { mutate, error, isLoading, isSuccess };
}
