import fetchPreregisteredDataCountRegistered, {
  TPreregisteredDataCountRegisteredResponse,
} from "@/app/_api/item_register/preregistered_data/fetchPreregisteredDataCountRegistered";
import fetchPreregisteredDataShow, {
  TPreregisteredDataResponse,
} from "@/app/_api/item_register/preregistered_data/fetchPreregisteredDataShow";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Box, Fab } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TSize } from "../../item-register-container";
import SizeSelectionDialog from "./size-selection-dialog";
import StockingIdInputDialog from "./stocking-id-input-dialog";

type TProps = {
  onSetDuplicationTargetItemId: (itemId: number | undefined) => void;
  createNewCard: (
    data: TPreregisteredDataResponse,
    selectedSize: TSize
  ) => void;
};

export default function PreregisteredItemFetcher({
  onSetDuplicationTargetItemId,
  createNewCard,
}: TProps) {
  // 登録コード追加ダイアログ関連
  const [isStockingIdInputDialogOpen, setIsStockingIdInputDialogOpen] =
    useState<boolean>(false);
  const [stockingDateCode, setStockingDateCode] = useState<string>();
  const [stockingSequence, setStockingSequence] = useState<string>();

  // preregisteredData関連
  const [preregisteredData, setPreregisteredData] =
    useState<TPreregisteredDataResponse>();

  // サイズ選択ダイアログ関連
  const [sizeSelectionState, setSizeSelectionState] =
    useState<TPreregisteredDataCountRegisteredResponse>();

  const handleClickAdd = () => {
    if (stockingDateCode !== undefined && stockingSequence !== undefined) {
      fetchPreregisteredDataShow({
        id: stockingDateCode + "-" + stockingSequence,
      })
        .then((preregisteredDataResponse: TPreregisteredDataResponse) => {
          setPreregisteredData(preregisteredDataResponse);
          fetchPreregisteredDataCountRegistered({
            id: preregisteredDataResponse.tStockingOrderId,
          })
            .then(
              (
                countDataResponse: TPreregisteredDataCountRegisteredResponse
              ) => {
                setSizeSelectionState(countDataResponse);
              }
            )
            .catch((e) => {
              alert(
                `データ取得に失敗しました。 ${
                  (e.response?.data as { message: string })?.message
                }`
              );
            });
        })
        .catch((e) => {
          alert(
            `データ取得に失敗しました。 ${
              (e.response?.data as { message: string })?.message
            }`
          );
        });

      setIsStockingIdInputDialogOpen(false);
    }
  };

  const handleClickSize = (selectedSize: TSize) => {
    if (preregisteredData) {
      const haveAlreadyRegisteredItem = (): number | undefined => {
        switch (selectedSize) {
          case "S":
            if (preregisteredData.smallRefItemId !== null) {
              return preregisteredData.smallRefItemId;
            }
            return undefined;
          case "M":
            if (preregisteredData.mediumRefItemId !== null) {
              return preregisteredData.mediumRefItemId;
            }
            return undefined;
          case "L":
            if (preregisteredData.largeRefItemId !== null) {
              return preregisteredData.largeRefItemId;
            }
            return undefined;
          case "XL":
            if (preregisteredData.extraLargeRefItemId !== null) {
              return preregisteredData.extraLargeRefItemId;
            }
            return undefined;
          default:
            return undefined;
        }
      };

      if (haveAlreadyRegisteredItem() !== undefined) {
        //もし既に登録済みのアイテムがあれば、そのアイテムで複製。
        onSetDuplicationTargetItemId(haveAlreadyRegisteredItem());
      } else {
        // なければ新規作成
        createNewCard(preregisteredData, selectedSize);
        setPreregisteredData(undefined);
      }
    }
    setSizeSelectionState(undefined);
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
            setPreregisteredData(undefined);
          }}
        />
      ) : (
        <Box>
          <Fab
            size="large"
            sx={{
              backgroundColor: "primary.main",
              position: "absolute",
              bottom: "12vh",
              right: "12.5vw",
            }}
            onClick={() => setIsStockingIdInputDialogOpen(true)}
          >
            <QrCode2Icon fontSize="large" sx={{ color: "white" }} />
          </Fab>
          <StockingIdInputDialog
            isOpen={isStockingIdInputDialogOpen}
            onClose={() => setIsStockingIdInputDialogOpen(false)}
            stockingDateCode={stockingDateCode}
            onChangeStockingDateCode={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setStockingDateCode(e.target.value)}
            stockingSequence={stockingSequence}
            onChangeStockingSequence={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setStockingSequence(e.target.value)}
            onClickAdd={handleClickAdd}
          ></StockingIdInputDialog>
        </Box>
      )}
    </>
  );
}
