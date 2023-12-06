"use client";
import { TCoordePicksIndexResponse } from "@/app/_api/coorde_pick/useCoordePicksIndex";
import useCoordePicksPick from "@/app/_api/coorde_pick/useCoordePicksPick";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Box, Fab } from "@mui/material";
import { useState } from "react";
import ItemCard from "../common/Item/item-card";
import ItemInfoCard from "../common/Item/item-info-card";
import QrCodeReader from "../common/barcode/qr-code-reader";
import DisableBackDialog from "../common/dialog/disable-back-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";

type TProps = {
  tChartId: number;
  tChartItems: TCoordePicksIndexResponse[];
};

export default function CoordePickList({ tChartId, tChartItems }: TProps) {
  const [chartItems, setChartItems] =
    useState<TCoordePicksIndexResponse[]>(tChartItems);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { mutate, isLoading } = useCoordePicksPick();
  const handleScan = (targetItemId: number) => {
    if (tChartId && targetItemId)
      mutate(
        { tChartId, targetItemId },
        {
          onError: (error) => {
            alert(error.message);
          },
          onSuccess: (data) => {
            setChartItems(data.data);
            setIsDialogOpen(false);
          },
        }
      );
  };
  return (
    <>
      <LoadingDialog isOpen={isLoading} />
      <Box>
        {chartItems.map((chartItem: TCoordePicksIndexResponse) => (
          <ItemCard
            key={chartItem.id}
            imagePath={chartItem.itemImageUrl}
            isItemPicked={chartItem.isPicked}
          >
            <ItemInfoCard itemInfo={chartItem} />
          </ItemCard>
        ))}
      </Box>
      <Box>
        <Fab
          size="large"
          sx={{
            backgroundColor: "primary.main",
            position: "absolute",
            bottom: "12vh",
            right: "12.5vw",
          }}
          onClick={() => setIsDialogOpen(true)}
        >
          <QrCode2Icon fontSize="large" sx={{ color: "white" }} />
        </Fab>
        <DisableBackDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          <QrCodeReader onScan={handleScan} />
        </DisableBackDialog>
      </Box>
    </>
  );
}
