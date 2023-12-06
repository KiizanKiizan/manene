import {
  TImageOption,
  TOption,
} from "@/app/_api/item_register/form/getFormOptionIndex";

export const getCateSmallName = (
  categorySmallOptions: TOption[],
  cateSmallId: number
): string => {
  return (
    categorySmallOptions.find((cateSmall) => {
      return cateSmall.value === cateSmallId;
    })?.name ?? ""
  );
};

export const getBrandName = (
  brandOptions: TOption[],
  brandId: number
): string => {
  return (
    brandOptions.find((brand) => {
      return brand.value === brandId;
    })?.name ?? ""
  );
};

export const getColorName = (
  colorOptions: TImageOption[],
  colorId: number
): string => {
  return (
    colorOptions.find((color) => {
      return color.value === colorId;
    })?.name ?? ""
  );
};

export const getSubColorName = (
  colorOptions: TImageOption[],
  subColorId?: number
): string => {
  if (subColorId === undefined) return "";
  return (
    colorOptions.find((color) => {
      return color.value === subColorId;
    })?.name ?? ""
  );
};

export const getPatternName = (
  patternOptions: TImageOption[],
  patternId: number
): string => {
  return (
    patternOptions.find((pattern) => {
      return pattern.value === patternId;
    })?.name ?? ""
  );
};

export const getLogoName = (
  logoOptions: TImageOption[],
  logoId: number
): string => {
  return (
    logoOptions.find((logo) => {
      return logo.value === logoId;
    })?.name ?? ""
  );
};
