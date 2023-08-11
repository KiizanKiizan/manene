"use client";
import { Button, Dialog } from "@mui/material";
import QrCodeReader from "../barcode/qr-code-reader";

type TProps = {
  isOpen: boolean;
  onClickCloseDialog: () => void;
  onClickOpenDialog: () => void;
  onScan: (id: number) => void;
};

export default function ItemRegister({
  isOpen,
  onClickCloseDialog,
  onClickOpenDialog,
  onScan,
}: TProps) {
  return (
    <>
      <Button
        variant="contained"
        onClick={onClickOpenDialog}
        sx={{ height: "50px" }}
      >
        アイテムスキャン
      </Button>
      <Dialog open={isOpen} onClose={onClickCloseDialog}>
        <QrCodeReader onScan={onScan} />
      </Dialog>
    </>
  );
}
