import getNoCacheData from "../../getNoCacheData";

export type TOption = {
  value: number;
  name: string;
};

export type TImageOption = {
  value: number;
  name: string;
  imagePath: string;
};

type TFormOptionIndexResponse = {
  categorySmalls: TOption[];
  brands: TOption[];
  colors: TImageOption[];
  patterns: TImageOption[];
  logos: TImageOption[];
  dropSizes: TOption[];
  admins: TOption[];
};
export default async function getFormOptionIndex() {
  return getNoCacheData<TFormOptionIndexResponse>({
    path: "item/form/options",
  });
}
