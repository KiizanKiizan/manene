"use client";
import { Button, Dialog } from "@mui/material";
import QrCodeReader from "../barcode/qr-code-reader";
import useDisableBrowserBack from "../custom-hook/useDisableBrowserBack";

type TProps = {
  onScan: (id: number) => void;
};

export default function ItemRegister({ onScan }: TProps) {
  const { isDialogOpen, handleClickCloseDialog, handleClickOpenDialog } =
    useDisableBrowserBack();
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpenDialog}
        sx={{ height: "50px" }}
      >
        アイテムスキャン
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClickCloseDialog}>
        <QrCodeReader onScan={onScan} />
      </Dialog>
    </>
  );
}
