import { usePatchRequest } from '../usePatchRequest';

export type TParams = {
  id: number;
  bust?: number;
  lengthTop?: number;
  roundNeck?: number;
  sleeveLength?: number;
  waist?: number;
  minWaist?: number;
  maxWaist?: number;
  hip?: number;
  roundLeg?: number;
  bottomsLength?: number;
  hemWidth?: number;
  size: string;
  rank: string;
};

export default function useSizeMeasurementUpdate(id: number) {
  const { mutate, error, isLoading } = usePatchRequest<Omit<TParams, 'id'>>({
    path: `size_measurement/${id}`,
  });
  return { mutate, error, isLoading };
}
