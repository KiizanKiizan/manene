"use client";
import { Box } from "@mui/material";
import ExpandableImage from "../common/Image/expandable-image";
import { TSize } from "../item-register/item-register-container";

export type TIitemInfo = {
  id: number;
  itemImageUrl: string;
  mBrand: string;
  size: TSize | null;
  mCateSmall: string;
  mColor: string;
  status: string;
};

type TProps = {
  itemInfo: TIitemInfo;
};

export default function WastedReasonItemMediumCard({ itemInfo }: TProps) {
  return (
    <Box display="flex" padding="7%">
      <Box>
        <ExpandableImage imagePath={itemInfo.itemImageUrl} />
      </Box>
      <Box
        paddingLeft="3%"
        sx={{
          color: "secondary.dark",
        }}
      >
        id: {itemInfo.id} {itemInfo.mBrand}
        <br />
        {itemInfo.size} / {itemInfo.mCateSmall} / {itemInfo.mColor}
        <br />
        <span style={{ color: "red" }}>
          現在のステータス: {itemInfo.status}
        </span>
      </Box>
    </Box>
  );
}
