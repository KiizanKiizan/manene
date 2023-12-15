import { TSize } from "@/app/_components/item-register/item-register-container";
import { usePatchRequest } from "../usePatchRequest";

export type TSizePartsParams = {
  shoulder?: number;
  bust?: number;
  lengthTop?: number;
  roundNeck?: number;
  waist?: number;
  minWaist?: number;
  maxWaist?: number;
  hip?: number;
  roundLeg?: number;
  outseam?: number;
  sleeveLength?: number;
  hemWidth?: number;
};

export type TSizeMeasurementUpdateParams = {
  id: number;
  size: TSize;
  rank: string;
} & TSizePartsParams;

export default function useSizeMeasurementUpdate(id: number) {
  const { mutate, error, isLoading } = usePatchRequest<
    Omit<TSizeMeasurementUpdateParams, "id">
  >({
    path: `size_measurement/${id}`,
  });
  return { mutate, error, isLoading };
}
