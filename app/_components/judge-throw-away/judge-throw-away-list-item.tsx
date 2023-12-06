"use client";
import { TItemsJudgeThrowAwayResponse as TProps } from "@/app/_api/judge_throw_away/useItemsJudgeThrowAway";
import { Box, Typography } from "@mui/material";
import ItemCard from "../common/item/item-card";
import ItemInfoCard from "../common/item/item-info-card";

const JUDGEMENT = {
  0: "修繕",
  1: "廃棄",
};

export default function JudgeThrowAwayListItem({
  result,
  item,
  condition,
  repairMethod,
  costDifference,
}: TProps) {
  return (
    <ItemCard imagePath={item.itemImageUrl}>
      <Box marginY={1} marginLeft={2}>
        <Typography color="primary.main">登録内容</Typography>
        <Box marginLeft={1}>
          <ItemInfoCard
            itemInfo={{
              id: item.id,
              size: item.size ?? "",
              itemImageUrl: item.itemImageUrl,
              mCateSmallName: item.mCateSmall.name,
              mColorName: item.mColor.name,
              mBrandName: item.mBrand.name,
            }}
          />
        </Box>
        <Typography color="primary.main">判定条件</Typography>
        <Typography marginLeft={1}>
          {condition}/{repairMethod}
        </Typography>
        <Typography color="primary.main">
          修繕コストと修繕後価格の差額
        </Typography>
        <Typography marginLeft={1}>{costDifference}円</Typography>
        <Typography color="primary.main">アイテム使用回数</Typography>
        <Typography marginLeft={1}>{item.usedCount}回</Typography>
        <Typography
          variant="h5"
          color={result === 0 ? "primary.main" : "warning.dark"}
          display="flex"
          justifyContent="center"
        >
          {JUDGEMENT[result as keyof typeof JUDGEMENT]}
        </Typography>
      </Box>
    </ItemCard>
  );
}
