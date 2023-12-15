import fetchPreregisteredDataCountRegistered, {
  TPreregisteredDataCountRegisteredResponse,
} from "@/app/_api/item_register/preregistered_data/fetchPreregisteredDataCountRegistered";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { TCardsState, TSize } from "../item-register-container";
import SizeSelectionDialog from "./preregistered-item/size-selection-dialog";

type TProps = {
  cardId: number;
  cardsState: TCardsState[];
  onCloseDialog: () => void;
  copyCard: (cardId: number, selectedSize: TSize) => void;
};

export default function ItemCopyDialog({
  cardId,
  cardsState,
  onCloseDialog,
  copyCard,
}: TProps) {
  const [sizeSelectionState, setSizeSelectionState] =
    useState<TPreregisteredDataCountRegisteredResponse>();

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
      ) : (
        <Dialog open>
          <DialogTitle>コピー</DialogTitle>
          <DialogContent>続けて同アイテムを登録しますか?</DialogContent>
          <DialogActions>
            <Button onClick={onCloseDialog}>キャンセル</Button>
            <Button onClick={() => handleClickCopy(cardId)}>OK</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
