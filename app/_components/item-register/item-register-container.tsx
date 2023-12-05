"use client";
import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Box, Fab } from "@mui/material";
import { ChangeEvent, useState } from "react";
import StockingIdInputDialog from "./item/stocking-id-input-dialog";
import PreregisteredItemFetcher from "./preregistered-item-fetcher";

type TProps = {
  formOption: TFormOptionIndexResponse;
};

export default function ItemRegisterContainer({ formOption }: TProps) {
  const [isStockingIdInputDialogOpen, setIsStockingIdInputDialogOpen] =
    useState<boolean>(false);
  const [stockingDateCode, setStockingDateCode] = useState<string>();
  const [stockingSequence, setStockingSequence] = useState<string>();
  const [isClickAdd, setIsClickAdd] = useState<boolean>(false);
  return (
    <>
      {isClickAdd && stockingDateCode && stockingSequence && (
        <PreregisteredItemFetcher
          formOption={formOption}
          stockingOrderId={stockingDateCode + stockingSequence}
        />
      )}
      <Box>
        <Fab
          size="large"
          sx={{
            backgroundColor: "primary.main",
            position: "absolute",
            bottom: "12vh",
            right: "12.5vw",
          }}
          onClick={() => setIsStockingIdInputDialogOpen(true)}
        >
          <QrCode2Icon fontSize="large" sx={{ color: "white" }} />
        </Fab>
        <StockingIdInputDialog
          isOpen={isStockingIdInputDialogOpen}
          onClose={() => setIsStockingIdInputDialogOpen(false)}
          stockingDateCode={stockingDateCode}
          onChangeStockingDateCode={(
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setStockingDateCode(e.target.value)}
          stockingSequence={stockingSequence}
          onChangeStockingSequence={(
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setStockingSequence(e.target.value)}
          onClickAdd={() => setIsClickAdd(true)}
        ></StockingIdInputDialog>
      </Box>
    </>
  );
}
