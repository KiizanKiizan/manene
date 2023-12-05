import { TMeasurement } from "@/app/_api/items/itemsShowResponse";
import { DROP_SIZE } from "@/app/_constants/drop-size";

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
  originalSize: string;
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
  size?: string;
  originalSize: string;
  dropSize: keyof typeof DROP_SIZE;
}): string => {
  const partSize = [
    {
      partName: "肩",
      partSize: shoulder,
    },
    { partName: "身幅", bust },
    { partName: "着丈", lengthTop },
    { partName: "首", roundNeck },
    { partName: "ウエスト", waist },
    { partName: "ウエスト最小", minWaist },
    { partName: "ウエスト最大", maxWaist },
    { partName: "ヒップ", hip },
    { partName: "もも", roundLeg },
    { partName: "総丈", outseam },
    { partName: "裄丈", sleeveLength },
    { partName: "裾幅", hemWidth },
  ].filter((v) => {
    return v.partSize !== null;
  }) as { partName: string; partSize: number }[];

  const resultString = partSize.reduce((acc, item) => {
    return acc + `/${item.partName}${item.partSize}`;
  }, "");
  return `${size ?? originalSize}/ドロップサイズ${
    DROP_SIZE[dropSize]
  }${resultString}`;
};
