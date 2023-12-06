"use client";
import { TItemInfo } from "@/app/_api/before-inspections/useBeforeInspectionsCreate";
import { INSPECTION_STATUS } from "@/app/_utils/functions/getStatusText";
import { Box, Button, Typography } from "@mui/material";
import React, { useMemo } from "react";

type TProps = {
  itemInfo: TItemInfo & {
    mLocationName?: string;
  };
  chartItemId?: number;
  onClick?: (id: number) => void;
  isLoading?: boolean;
  isPurchased?: boolean;
  inspectionStatus?: number | null;
};

function InspectionStatusText({ children }: { children: React.ReactNode }) {
  return (
    <Typography color="warning.dark" variant="body2" marginRight={2}>
      {children}
    </Typography>
  );
}

export default function ItemInfoCard({
  itemInfo,
  chartItemId,
  onClick,
  isLoading,
  isPurchased,
  inspectionStatus,
}: TProps) {
  const statusView = useMemo(() => {
    return {
      [INSPECTION_STATUS.RETURNED]: (
        <Button
          onClick={() => {
            if (onClick && chartItemId) {
              onClick(chartItemId);
            }
          }}
          disabled={isLoading}
          variant="contained"
          sx={{ marginRight: "15px" }}
        >
          入れ忘れ
        </Button>
      ),
      [INSPECTION_STATUS.MISPLACED]: (
        <InspectionStatusText>入れ忘れ登録済み</InspectionStatusText>
      ),
      [INSPECTION_STATUS.INSPECTED]: (
        <InspectionStatusText>検品済み</InspectionStatusText>
      ),
      [INSPECTION_STATUS.WASHING]: (
        <InspectionStatusText>汚れ確認中</InspectionStatusText>
      ),
      [INSPECTION_STATUS.PURCHASE_REQUEST]: (
        <InspectionStatusText>買取依頼済み</InspectionStatusText>
      ),
      [INSPECTION_STATUS.PURCHASE_CANDIDATE]: (
        <InspectionStatusText>買取候補</InspectionStatusText>
      ),
    }[inspectionStatus as number];
  }, [inspectionStatus, onClick, isLoading, chartItemId]);

  return (
    <>
      {itemInfo.mLocationName && (
        <Typography component="div" display={"flex"} fontSize={"h5.fontSize"}>
          <Box>棚名</Box>
          <Box sx={{ mx: 1 }}>:</Box>
          <Box>{itemInfo.mLocationName}</Box>
        </Typography>
      )}
      <Box>
        <Box>
          <Typography
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: 17,
            }}
          >
            <Box mr={1.5}>{itemInfo.id}</Box>
            <Box>{itemInfo.mBrandName}</Box>
          </Typography>
          <Typography component="div" display={"flex"} fontSize={17}>
            <Box>{itemInfo.size}</Box>
            <Box mx={0.5}>/</Box>
            <Box>{itemInfo.mCateSmallName}</Box>
            <Box mx={0.5}>/</Box>
            <Box>{itemInfo.mColorName}</Box>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="end">
          {isPurchased ? (
            <InspectionStatusText>購入済み</InspectionStatusText>
          ) : (
            statusView
          )}
        </Box>
      </Box>
    </>
  );
}
