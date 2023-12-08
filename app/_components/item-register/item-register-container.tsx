"use client";
import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import fetchPreregisteredDataShow, {
  TPreregisteredDataResponse,
} from "@/app/_api/item_register/preregistered_data/fetchPreregisteredDataShow";
import fetchPreregisteredDataCountRegistered, {
  TPreregisteredDataCountRegisteredResponse,
} from "@/app/_api/item_register/preregistered_data/fetchePreregisteredDataCountRegistered";
import { TMeasurement } from "@/app/_api/items/itemsShowResponse";
import { DROP_SIZE } from "@/app/_constants/drop-size";
import {
  getRegisteredContentMessage,
  getRegisteredSizeMessage,
} from "@/app/_service/item-register/getItemCardMessages";
import {
  getBrandName,
  getCateSmallName,
  getColorName,
  getLogoName,
  getPatternName,
  getSubColorName,
} from "@/app/_utils/functions/getItemOptionName";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Box, Fab } from "@mui/material";
import { ChangeEvent, useReducer, useState } from "react";
import SizeMeasurementSwitcher from "./item/item-info/size-measurement-switcher";
import RegisteredItemCardList, {
  TCardInfo,
} from "./item/item-list/registered-item-card-list";
import SizeSelectionDialog from "./item/size-selection-dialog";
import StockingIdInputDialog from "./item/stocking-id-input-dialog";

export type TCardsState = {
  stockingOrderId: number;
  itemImage: string;
  itemId?: number;
  cateSmall: string;
  brand: string;
  color: string;
  subColor?: string;
  pattern: string;
  logo: string;
  originalSize: string;
  dropSize: string;
  size?: string;
  adminId?: number;
  isRegistered: boolean;
  createNum: number;
} & TMeasurement;

export type TCreateOrUpdateActionValue = {
  itemId: number;
  adminId: number;
  size: string;
} & TMeasurement;

type TCardsAction =
  | {
      type: "ADD_CARD";
      value: TCardsState;
    }
  | {
      type: "CREATE_OR_UPDATE_CARD";
      value: TCreateOrUpdateActionValue;
    }
  | {
      type: "DELETE_CARD";
      value: number;
    }
  | {
      type: "Duplicate_CARD";
      value: TCardsState[];
    };

type TProps = {
  formOption: TFormOptionIndexResponse;
};

export default function ItemRegisterContainer({ formOption }: TProps) {
  // 登録コード追加ダイアログ関連
  const [isStockingIdInputDialogOpen, setIsStockingIdInputDialogOpen] =
    useState<boolean>(false);
  const [stockingDateCode, setStockingDateCode] = useState<string>();
  const [stockingSequence, setStockingSequence] = useState<string>();
  // カード関連
  const [selectedCardId, setSelectedCardId] = useState<number>();

  // サイズ選択ダイアログ関連
  const [sizeSelectionState, setSizeSelectionState] =
    useState<TPreregisteredDataCountRegisteredResponse>();

  // preregisteredData関連
  const [preregisteredData, setPreregisteredData] =
    useState<TPreregisteredDataResponse>();

  const cardsStateReducer = (
    cardsState: TCardsState[],
    action: TCardsAction
  ) => {
    if (action.type === "CREATE_OR_UPDATE_CARD") {
      setSelectedCardId(undefined);
    }

    switch (action.type) {
      case "ADD_CARD":
        return [...cardsState, action.value];
      case "CREATE_OR_UPDATE_CARD":
        return cardsState.map((cardState, index) => {
          if (index === selectedCardId) {
            return {
              ...cardState,
              itemId: action.value.itemId,
              adminId: action.value.adminId,
              size: action.value.size,
              shoulder: action.value.shoulder,
              bust: action.value.bust,
              waist: action.value.waist,
              minWaist: action.value.minWaist,
              maxWaist: action.value.maxWaist,
              lengthTop: action.value.lengthTop,
              roundNeck: action.value.roundNeck,
              hip: action.value.hip,
              roundLeg: action.value.roundLeg,
              outseam: action.value.outseam,
              sleeveLength: action.value.sleeveLength,
              hemWidth: action.value.hemWidth,
              isRegistered: true,
            };
          }
          return cardState;
        });
      default:
        throw new Error("存在しないactionです");
    }
  };

  const [cardsState, dispatch] = useReducer(cardsStateReducer, []);

  const handleCreateOrUpdateCardState = (args: TCreateOrUpdateActionValue) => {
    dispatch({
      type: "CREATE_OR_UPDATE_CARD",
      value: args,
    });
  };

  const handleClickSize = (selectedSize: string) => {
    if (preregisteredData) {
      dispatch({
        type: "ADD_CARD",
        value: {
          stockingOrderId: preregisteredData.tStockingOrderId,
          itemImage: preregisteredData.tPreregisteredItem.itemImageUrl,
          cateSmall: getCateSmallName(
            formOption.categorySmalls,
            preregisteredData.tPreregisteredItem.mCateSmallId
          ),
          brand: getBrandName(
            formOption.brands,
            preregisteredData.tPreregisteredItem.mBrandId
          ),
          color: getColorName(
            formOption.colors,
            preregisteredData.tPreregisteredItem.mColorId
          ),
          subColor: getSubColorName(
            formOption.colors,
            preregisteredData.tPreregisteredItem.mSubColorId
          ),
          pattern: getPatternName(
            formOption.patterns,
            preregisteredData.tPreregisteredItem.mPatternId
          ),
          logo: getLogoName(
            formOption.logos,
            preregisteredData.tPreregisteredItem.mLogoId
          ),
          originalSize: selectedSize,
          dropSize: DROP_SIZE[preregisteredData.tPreregisteredItem.dropSize],
          size: undefined,
          adminId: undefined,
          isRegistered: false,
          createNum: 1,
          shoulder: null,
          bust: null,
          waist: null,
          minWaist: null,
          maxWaist: null,
          lengthTop: null,
          roundNeck: null,
          hip: null,
          roundLeg: null,
          outseam: null,
          sleeveLength: null,
          hemWidth: null,
        },
      });
    }
    setSizeSelectionState(undefined);
    setPreregisteredData(undefined);
  };

  const handleClickAdd = () => {
    if (stockingDateCode !== undefined && stockingSequence !== undefined)
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
  };

  const cardInfo: TCardInfo[] = cardsState.map((card, index) => {
    const adminName: string =
      formOption.admins.find((admin) => {
        return admin.value === card.adminId;
      })?.name ?? "未登録";

    const registeredContentMessage = getRegisteredContentMessage({
      itemId: card.itemId,
      cateSmall: card.cateSmall,
      brand: card.brand,
      color: card.color,
      subColor: card.subColor,
      pattern: card.pattern,
      logo: card.logo,
      originalSize: card.originalSize ?? "",
    });

    const registeredSizeMessage = getRegisteredSizeMessage({
      shoulder: card.shoulder,
      bust: card.bust,
      waist: card.waist,
      minWaist: card.minWaist,
      maxWaist: card.maxWaist,
      lengthTop: card.lengthTop,
      roundNeck: card.roundNeck,
      hip: card.hip,
      roundLeg: card.roundLeg,
      outseam: card.outseam,
      sleeveLength: card.sleeveLength,
      hemWidth: card.hemWidth,
      size: card.size,
      originalSize: card.originalSize ?? "",
      dropSize: card.dropSize,
    });

    return {
      cardId: index,
      itemImage: card.itemImage,
      adminName: adminName,
      registeredContentMessage: registeredContentMessage,
      registeredSizeMessage: registeredSizeMessage,
      isRegistered: card.isRegistered,
    };
  });

  const selectedCardState: TCardsState | undefined = cardsState.find(
    (cardState, index) => {
      if (index === selectedCardId) return cardState;
    }
  );

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
      ) : selectedCardId !== undefined && selectedCardState !== undefined ? (
        <SizeMeasurementSwitcher
          cardState={selectedCardState}
          arrivalSize={selectedCardState.originalSize}
          formOption={formOption}
          onClose={() => setSelectedCardId(undefined)}
          onCreateOrUpdateCardState={handleCreateOrUpdateCardState}
        />
      ) : (
        <>
          <RegisteredItemCardList
            cardInfo={cardInfo}
            onClick={(cardId: number) => {
              setSelectedCardId(cardId);
            }}
            onLongPress={(cardId: number) => {
              alert(cardId);
            }}
          />
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
        </>
      )}
    </>
  );
}
