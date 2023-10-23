import { useGetRequest } from '../useGetRequest';

type Tparams = { waist: number };
export type TuseSizeCalcIndexResponse = {
  size: string;
};

export default function useSizeCalcIndex(params: Tparams) {
  const { data, error, isLoading } = useGetRequest<TuseSizeCalcIndexResponse>({
    path: 'size_calc',
    params,
  });
  return { data, error, isLoading };
}
