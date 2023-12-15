"use client";
import deleteItemsDestroy from "@/app/_api/item_register/deleteItemsDestroy";
import fetchPreregisteredDataCountRegistered, {
  TPreregisteredDataCountRegisteredResponse,
} from "@/app/_api/item_register/preregistered_data/fetchPreregisteredDataCountRegistered";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { TCardsState, TSize } from "../item-register-container";
import SizeSelectionDialog from "./preregistered-item/size-selection-dialog";

type TProps = {
  cardId: number;
  cardsState: TCardsState[];
  onCloseDialog: () => void;
  deleteCard: (cardId: number) => void;
  copyCard: (cardId: number, selectedSize: TSize) => void;
};

export default function ItemOperationDialog({
  cardId,
  cardsState,
  onCloseDialog,
  deleteCard,
  copyCard,
}: TProps) {
  const [sizeSelectionState, setSizeSelectionState] =
    useState<TPreregisteredDataCountRegisteredResponse>();

  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState<boolean>(false);

  const deleteTargetItemId = cardsState[cardId].itemId;

  const handleDelete = () => {
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

    deleteCard(cardId);
    setIsDeleteConfirmDialogOpen(false);
  };

  const handleClickCopy = (copyCardId: number) => {
    fetchPreregisteredDataCountRegistered({
      id: cardsState[copyCardId].stockingOrderId,
    })
      .then((countDataResponse: TPreregisteredDataCountRegisteredResponse) => {
        setSizeSelectionState(countDataResponse);
      })
      .catch((e) => {
        alert(
          `データ取得に失敗しました。 ${
            (e.response?.data as { message: string })?.message
          }`
        );
      });
  };

  const handleClickSize = (selectedSize: TSize) => {
    copyCard(cardId, selectedSize);
    setSizeSelectionState(undefined);
    onCloseDialog();
  };

  return (
    <>
      {sizeSelectionState ? (
        <SizeSelectionDialog
          stockingId={sizeSelectionState.stockingId}
          arrivedSmallNum={sizeSelectionState.arrivedSmallNum}
          arrivedMediumNum={sizeSelectionState.arrivedMediumNum}
          arrivedLargeNum={sizeSelectionState.arrivedLargeNum}
          arrivedExtraLargeNum={sizeSelectionState.arrivedExtraLargeNum}
          registeredSmallNum={sizeSelectionState.registeredSmallNum}
          registeredMediumNum={sizeSelectionState.registeredMediumNum}
          registeredLargeNum={sizeSelectionState.registeredLargeNum}
          registeredExtraLargeNum={sizeSelectionState.registeredExtraLargeNum}
          onClickSize={handleClickSize}
          onClose={() => {
            setSizeSelectionState(undefined);
          }}
        />
      ) : isDeleteConfirmDialogOpen ? (
        <Dialog open fullWidth>
          <DialogContent>確認</DialogContent>
          <DialogContent>本当に消去しますか？</DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsDeleteConfirmDialogOpen(false);
                onCloseDialog();
              }}
            >
              キャンセル
            </Button>
            <Button onClick={handleDelete}>OK</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open fullWidth>
          <DialogContent>操作を選択してください</DialogContent>
          <DialogActions>
            <Button onClick={onCloseDialog}>キャンセル</Button>
            <Button
              color="error"
              onClick={() => setIsDeleteConfirmDialogOpen(true)}
            >
              消去
            </Button>
            <Button onClick={() => handleClickCopy(cardId)}>コピー</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
