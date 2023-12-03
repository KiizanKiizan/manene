import { TOption } from "@/app/_api/item_register/form/getFormOptionIndex";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import DisableBackDialog from "../../common/dialog/disable-back-dialog";

type TProps = {
  isOpen: boolean;
  adminOption: TOption[];
  selectedCreateNum?: number;
  selectedAdminId: number;
  onChangeSelectedCreateNum: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeAdminId: (e: SelectChangeEvent<number>) => void;
  onClose: () => void;
  onClickCancel: () => void;
  onClickAdd: () => void;
};

export default function ItemDuplicationDialog({
  isOpen,
  adminOption,
  selectedCreateNum,
  selectedAdminId,
  onChangeSelectedCreateNum,
  onChangeAdminId,
  onClose,
  onClickCancel,
  onClickAdd,
}: TProps) {
  return (
    <DisableBackDialog open={isOpen} onClose={onClose}>
      <DialogTitle>一斉作成</DialogTitle>
      <DialogContent>
        <Box>
          <Typography>一斉作成可能アイテムです。</Typography>
          <Typography>作成数と登録者を指定してください。</Typography>
        </Box>
        <Box margin={2}>
          <Box display="flex" justifyContent="center">
            <Typography>作成数：</Typography>
            <TextField
              value={selectedCreateNum}
              onChange={onChangeSelectedCreateNum}
              variant="standard"
              type="number"
              size="small"
              sx={{ width: "40px" }}
            />
          </Box>
          <Box marginX={1} marginY={2} display="flex" justifyContent="center">
            <FormControl>
              <Box display="flex">
                <Typography>登録者：</Typography>
                <Select
                  value={selectedAdminId}
                  label="admin"
                  onChange={onChangeAdminId}
                  variant="standard"
                >
                  {adminOption.map((admin) => (
                    <MenuItem key={admin.value} value={admin.value}>
                      {admin.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickCancel}>キャンセル</Button>
        <Button
          onClick={onClickAdd}
          disabled={!selectedCreateNum || selectedCreateNum <= 0}
        >
          追加
        </Button>
      </DialogActions>
    </DisableBackDialog>
  );
}
