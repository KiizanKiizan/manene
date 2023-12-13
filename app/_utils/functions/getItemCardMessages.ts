import { TMeasurement } from "@/app/_api/items/itemsShowResponse";
import { TSize } from "@/app/_components/item-register/item-register-container";

export const getRegisteredContentMessage = ({
  itemId,
  cateSmall,
  brand,
  color,
  subColor,
  pattern,
  logo,
  originalSize,
}: {
  itemId?: number;
  cateSmall: string;
  brand: string;
  color: string;
  subColor?: string;
  pattern: string;
  logo: string;
  originalSize: TSize;
}): string => {
  const itemIdString = itemId ? `${itemId}/` : "";

  return `${itemIdString}${cateSmall}/${brand}/${color}/${
    subColor ?? "無し"
  }/${pattern}/${logo}/入荷サイズ${originalSize}`;
};

export const getRegisteredSizeMessage = ({
  shoulder,
  bust,
  waist,
  minWaist,
  maxWaist,
  lengthTop,
  roundNeck,
  hip,
  roundLeg,
  outseam,
  sleeveLength,
  hemWidth,
  size,
  originalSize,
  dropSize,
}: TMeasurement & {
  size?: string | null;
  originalSize: TSize;
  dropSize: string;
}): string => {
  const partSize = [
    {
      partName: "肩",
      partSize: shoulder,
    },
    { partName: "身幅", partSize: bust },
    { partName: "着丈", partSize: lengthTop },
    { partName: "首", partSize: roundNeck },
    { partName: "ウエスト", partSize: waist },
    { partName: "ウエスト最小", partSize: minWaist },
    { partName: "ウエスト最大", partSize: maxWaist },
    { partName: "ヒップ", partSize: hip },
    { partName: "もも", partSize: roundLeg },
    { partName: "総丈", partSize: outseam },
    { partName: "裄丈", partSize: sleeveLength },
    { partName: "裾幅", partSize: hemWidth },
  ].filter((v) => {
    return v.partSize !== null;
  }) as { partName: string; partSize: number }[];

  const resultString = partSize.reduce((acc, item) => {
    return acc + `/${item.partName}${item.partSize}`;
  }, "");

  return `${size ?? originalSize}/ドロップサイズ${dropSize}${resultString}`;
};
