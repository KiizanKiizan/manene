import { TItemsShowResponse } from '../items/itemsShowResponse';
import { usePostRequest } from '../usePostRequest';

type TParams = {
  id: number;
  conditionId: number;
  repairMethodId: number;
};

export type TItemsJudgeThrowAwayResponse = {
  result: number;
  item: TItemsShowResponse;
  condition: string;
  repairMethod: string;
  costDifference: number;
};

export default function useItemsJudgeThrowAway(params: Pick<TParams, 'id'>) {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<
    Omit<TParams, 'id'>,
    TItemsJudgeThrowAwayResponse
  >({
    path: `items/${params.id}/judge_throw_away`,
  });
  return { mutate, error, isLoading, isSuccess };
}
