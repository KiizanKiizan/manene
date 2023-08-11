"use client";

import { TGetItemsShowResponse } from "@/app/api/item_detail/getItemsShow";
import ItemDetailCard from "./item-detail-card";

type TProps = {
  itemInfo: TGetItemsShowResponse;
};

export default function ItemDetailCardContainer({ itemInfo }: TProps) {
  const partSize = [
    { partName: "肩", partSize: itemInfo.shoulder },
    { partName: "身幅", partSize: itemInfo.bust },
    { partName: "ウエスト", partSize: itemInfo.waist },
    { partName: "ヒップ", partSize: itemInfo.hip },
    { partName: "袖", partSize: itemInfo.lengthArm },
    { partName: "着丈", partSize: itemInfo.lengthTop },
    { partName: "股上", partSize: itemInfo.lengthTop },
    { partName: "股下", partSize: itemInfo.lengthLeg },
    { partName: "首", partSize: itemInfo.roundNeck },
    { partName: "もも", partSize: itemInfo.roundLeg },
    { partName: "ふくらはぎ", partSize: itemInfo.roundCalf },
  ].filter((v) => {
    return v.partSize !== null;
  }) as { partName: string; partSize: number }[];

  const itemDetails = [
    { label: "アイテムID", value: itemInfo.id },
    {
      label: "ランク・使用回数",
      value: `${itemInfo.rank}・${itemInfo.usedCount}`,
    },
    {
      label: "棚",
      value: itemInfo.mLocation === null ? "なし" : itemInfo.mLocation.name,
    },
    { label: "アイテムコード", value: itemInfo.itemCode },
    { label: "UWear分類サイズ", value: itemInfo.leeapSize },
    { label: "ドロップサイズ", value: itemInfo.dropSize.name },
    { label: "カテゴリ", value: itemInfo.mCateSmall.name },
    { label: "ブランド", value: itemInfo.mBrand.name },
    { label: "メインカラー", value: itemInfo.mColor.name },
    {
      label: "サブカラー",
      value: itemInfo.mSubColor === null ? "なし" : itemInfo.mSubColor.name,
    },
    { label: "柄", value: itemInfo.mPattern.name },
    { label: "ロゴ", value: itemInfo.mLogo.name },
    { label: "婚活フラグ", value: itemInfo.isMarriage ? "○" : "なし" },
    { label: "ゴム紐フラグ", value: itemInfo.isElasticBand ? "○" : "なし" },
    {
      label: "販売価格(税込)",
      value: `${itemInfo.priceTaxIn.toLocaleString()}円`,
    },
    {
      label: "上代参考価格",
      value: `${itemInfo.priceRefTaxIn.toLocaleString()}円`,
    },
    { label: "アイテムステータス", value: itemInfo.itemStatus.name },
    { label: "登録者", value: itemInfo.tAdmin.name },
    { label: "登録日", value: itemInfo.regDate ?? "" },
  ];

  return (
    <ItemDetailCard
      itemImageUrl={itemInfo.itemImageUrl}
      partSizes={partSize}
      wearSize={itemInfo.size ?? "なし"}
      itemDetails={itemDetails}
    />
  );
}
