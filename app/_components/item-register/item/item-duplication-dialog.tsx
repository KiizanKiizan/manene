import { TOption } from "@/app/_api/item_register/form/getFormOptionIndex";
import postItemsDuplicate from "@/app/_api/item_register/postitemsDuplicate";
import { TItemsShowResponse } from "@/app/_api/items/itemsShowResponse";
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
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import DisableBackDialog from "../../common/dialog/disable-back-dialog";

type TProps = {
  cardId: number;
  adminOption: TOption[];
  onCloseDialog: () => void;
  duplicateCard: (data: TItemsShowResponse[]) => void;
};

export default function ItemDuplicationDialog({
  cardId,
  adminOption,
  onCloseDialog,
  duplicateCard,
}: TProps) {
  const defaultCreateNum = 1;
  const defaultAdminId = 2;
  const [selectedCreateNum, setSelectedCreateNum] = useState<
    number | undefined
  >(defaultCreateNum);
  const [selectedAdminId, setSelectedAdminId] =
    useState<number>(defaultAdminId);

  const handleClickDuplicate = () => {
    if (cardId && selectedCreateNum)
      postItemsDuplicate({
        id: cardId,
        tAdminId: selectedAdminId,
        createNum: selectedCreateNum,
      })
        .then((res: TItemsShowResponse[]) => {
          duplicateCard(res);
        })
        .catch((e: AxiosError) => {
          alert(`アイテムの複製に失敗しました。 ${e.message}`);
        });
    onCloseDialog();
  };
  return (
    <DisableBackDialog open onClose={onCloseDialog}>
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
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) =>
                setSelectedCreateNum(
                  isNaN(parseInt(e.target.value))
                    ? undefined
                    : parseInt(e.target.value)
                )
              }
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
                  onChange={(e: SelectChangeEvent<number>) =>
                    setSelectedAdminId(Number(e.target.value))
                  }
                  variant="standard"
                  sx={{ maxHeight: "100vh", overflow: "auto" }}
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
        <Button onClick={onCloseDialog}>キャンセル</Button>
        <Button
          onClick={handleClickDuplicate}
          disabled={!selectedCreateNum || selectedCreateNum <= 0}
        >
          追加
        </Button>
      </DialogActions>
    </DisableBackDialog>
  );
}
