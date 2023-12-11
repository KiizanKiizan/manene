"use client";
import deleteItemsDestroy from "@/app/_api/item_register/deleteItemsDestroy";
import { TPreregisteredDataCountRegisteredResponse } from "@/app/_api/item_register/preregistered_data/fetchePreregisteredDataCountRegistered";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { AxiosError } from "axios";

type TProps = {
  deleteTargetItemId?: number;
  isDeleteConfirmDialogOpen: boolean;
  sizeSelectionState?: TPreregisteredDataCountRegisteredResponse;
  deleteCard: () => void;
  onClickDelete: () => void;
  onClickCancelOperationDialog: () => void;
  onClickCopy: () => void;
  onClickCancelConfirmDialog: () => void;
};

export default function ItemOperationDialog({
  deleteTargetItemId,
  isDeleteConfirmDialogOpen,
  sizeSelectionState,
  deleteCard,
  onClickDelete,
  onClickCancelOperationDialog,
  onClickCopy,
  onClickCancelConfirmDialog,
}: TProps) {
  const handleClickConfirmDelete = () => {
    if (deleteTargetItemId) {
      deleteItemsDestroy({ id: deleteTargetItemId }).catch(
        (error: AxiosError) => {
          alert(
            `アイテム消去に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        }
      );
    }

    deleteCard();
  };

  return (
    <>
      {isDeleteConfirmDialogOpen && (
        <Dialog open fullWidth>
          <DialogContent>確認</DialogContent>
          <DialogContent>本当に消去しますか？</DialogContent>
          <DialogActions>
            <Button onClick={onClickCancelConfirmDialog}>キャンセル</Button>
            <Button onClick={handleClickConfirmDelete}>OK</Button>
          </DialogActions>
        </Dialog>
      )}
      {!sizeSelectionState && (
        <Dialog open fullWidth>
          <DialogContent>操作を選択してください</DialogContent>
          <DialogActions>
            <Button onClick={onClickCancelOperationDialog}>キャンセル</Button>
            <Button color="error" onClick={onClickDelete}>
              消去
            </Button>
            <Button onClick={onClickCopy}>コピー</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
