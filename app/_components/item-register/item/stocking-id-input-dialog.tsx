import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import DisableBackDialog from "../../common/dialog/disable-back-dialog";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  stockingDateCode?: string;
  stockingSequence?: string;
  onChangeStockingDateCode: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeStockingSequence: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClickAdd: () => void;
};

export default function StockingIdInputDialog({
  isOpen,
  onClose,
  stockingDateCode,
  stockingSequence,
  onChangeStockingDateCode,
  onChangeStockingSequence,
  onClickAdd,
}: TProps) {
  return (
    <DisableBackDialog open={isOpen} onClose={onClose}>
      <DialogTitle>登録コードを入力</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center">
          <TextField
            value={stockingDateCode}
            onChange={onChangeStockingDateCode}
            variant="standard"
            type="number"
            size="small"
            sx={{ width: "150px" }}
          />
          <Typography marginX={1}>-</Typography>
          <TextField
            value={stockingSequence}
            onChange={onChangeStockingSequence}
            variant="standard"
            type="number"
            size="small"
            sx={{ width: "80px" }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button
          onClick={onClickAdd}
          disabled={
            stockingDateCode === undefined || stockingSequence === undefined
          }
        >
          追加
        </Button>
      </DialogActions>
    </DisableBackDialog>
  );
}
