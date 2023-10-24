import fetchData from '../fetchData';

type Tparams = { waist: number };
export type TuseSizeCalcIndexResponse = {
  size: string;
};

export default function useSizeCalcIndex(params: Tparams) {
  const data = fetchData<TuseSizeCalcIndexResponse>({
    path: 'size_calc',
    params,
  });
  return data;
}
