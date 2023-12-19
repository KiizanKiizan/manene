import { TSize } from "@/app/_components/item-register/item-register-container";
import fetchData from "../fetchData";

type TParams = {
  item_id: number;
  cate_small_id: number;
  waist: number;
};

export type TSizeCalcIndexResponse = {
  size: TSize;
};

export default function fetchSizeCalcIndex(params: TParams) {
  const data = fetchData<TSizeCalcIndexResponse>({
    path: "size_calc",
    params,
  });
  return data;
}
