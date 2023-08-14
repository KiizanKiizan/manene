"use client";
import { TItemLocationsItemScanResponse } from "@/app/api/item-location/useItemLocationsItemScan";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import QrCodeReader from "../common/barcode/qr-code-reader";

type TProps = {
  locationId?: number;
  selectedItem: TItemLocationsItemScanResponse[];
  isOpen: boolean;
  onClickCloseDialog: () => void;
  onClickOpenDialog: () => void;
  onScan: (id: number) => void;
  onClickCancel: () => void;
  onClickOk: () => void;
  isLoading: boolean;
};

export default function LocationRegister({
  locationId,
  selectedItem,
  isOpen,
  onClickCloseDialog,
  onClickOpenDialog,
  onScan,
  onClickCancel,
  onClickOk,
  isLoading,
}: TProps) {
  return (
    <>
      {!locationId ? (
        <>
          <Button
            variant="contained"
            onClick={onClickOpenDialog}
            sx={{ height: "50px" }}
            disabled={selectedItem.length < 1}
          >
            棚移動
          </Button>
          <Dialog open={isOpen} onClose={onClickCloseDialog}>
            <QrCodeReader onScan={onScan} />
          </Dialog>
        </>
      ) : (
        <Dialog open fullWidth>
          <DialogTitle>確認</DialogTitle>
          <DialogContent>
            <Typography>棚版: {locationId}</Typography>
            <Typography>に登録しますか？</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClickCancel}>キャンセル</Button>
            <Button
              onClick={onClickOk}
              disabled={locationId === undefined && isLoading}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
