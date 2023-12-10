"use client";

import { TPreregisteredDataCountRegisteredResponse } from "@/app/_api/item_register/preregistered_data/fetchePreregisteredDataCountRegistered";
import useItemsDestroy from "@/app/_api/item_register/useItemsDestroy";
import LoadingDialog from "@/app/_components/common/dialog/loading-dialog";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { AxiosError } from "axios";

type TProps = {
  deleteTargetItemId: number;
  isRegistered: boolean;
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
  isRegistered,
  isDeleteConfirmDialogOpen,
  sizeSelectionState,
  deleteCard,
  onClickDelete,
  onClickCancelOperationDialog,
  onClickCopy,
  onClickCancelConfirmDialog,
}: TProps) {
  const { mutate, isLoading } = useItemsDestroy({ id: deleteTargetItemId });

  const handleClickConfirmDelete = () => {
    if (isRegistered) {
      mutate(undefined, {
        onError(error: AxiosError) {
          alert(
            `アイテム消去に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        },
      });
    }
    deleteCard();
  };

  return (
    <>
      <LoadingDialog isOpen={isLoading} />
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
