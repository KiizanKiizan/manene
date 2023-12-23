"use client";
import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import { TPreregisteredDataResponse } from "@/app/_api/item_register/preregistered_data/fetchPreregisteredDataShow";
import {
  TItemsShowResponse,
  TMeasurement,
} from "@/app/_api/items/itemsShowResponse";
import { DROP_SIZE } from "@/app/_constants/drop-size";
import { ORIGINAL_SIZE_LABEL } from "@/app/_constants/original-size";
import {
  getRegisteredContentMessage,
  getRegisteredSizeMessage,
} from "@/app/_utils/functions/getItemCardMessages";
import {
  getBrandName,
  getCateSmallName,
  getColorName,
  getLogoName,
  getPatternName,
  getSubColorName,
} from "@/app/_utils/functions/getItemOptionName";
import { Box } from "@mui/material";
import { useReducer, useState } from "react";
import Header from "../common/pages/header";
import ItemCopyDialog from "./item/item-copy-dialog";
import ItemDuplicationDialog from "./item/item-duplication-dialog";
import SizeMeasurementSwitcher from "./item/item-info/size-measurement-switcher";
import RegisteredItemCardList, {
  TCardInfo,
} from "./item/item-list/registered-item-card-list";
import ItemOperationDialog from "./item/item-operation-dialog";
import PreregisteredItemFetcher from "./item/preregistered-item/preregistered-item-fetcher";

export type TSize = "S" | "L" | "M" | "XL" | "";

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
  originalSize: TSize;
  dropSize: string;
  size?: TSize | null;
  adminId?: number;
  isRegistered: boolean;
} & TMeasurement;

export type TCreateOrUpdateActionValue = {
  itemId: number;
  adminId: number;
  size: TSize;
} & TMeasurement;

type TCardsAction =
  | {
      type: "ADD_CARD";
      value: TCardsState[];
    }
  | {
      type: "CREATE_OR_UPDATE_CARD";
      value: TCreateOrUpdateActionValue;
    }
  | {
      type: "DELETE_CARD";
      value: number;
    };

type TProps = {
  formOption: TFormOptionIndexResponse;
};

export default function ItemRegisterContainer({ formOption }: TProps) {
  // カード関連
  const [selectedCardId, setSelectedCardId] = useState<number>();

  // 複製ダイアログ関連
  const [duplicationTargetItemId, setDuplicationTargetItemId] =
    useState<number>();

  // カード操作ダイアログ関連
  const [operationTargetCardId, setOperationTargetCardId] = useState<number>();

  // カードコピーダイアログ関連
  const [copyTargetCardId, setCopyTargetCardId] = useState<number>();

  const cardsStateReducer = (
    cardsState: TCardsState[],
    action: TCardsAction
  ) => {
    if (action.type === "CREATE_OR_UPDATE_CARD") {
      setSelectedCardId(undefined);
      setCopyTargetCardId(selectedCardId);
    }

    switch (action.type) {
      case "ADD_CARD":
        return [...cardsState, ...action.value];
      case "DELETE_CARD":
        return cardsState.filter((cardState, index) => {
          if (index !== action.value) return cardState;
        });
      case "CREATE_OR_UPDATE_CARD":
        return cardsState.map((cardState, index) => {
          if (index === selectedCardId) {
            return {
              ...cardState,
              ...action.value,
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

  const createNewCard = (
    data: TPreregisteredDataResponse,
    selectedSize: TSize
  ) => {
    dispatch({
      type: "ADD_CARD",
      value: [
        {
          stockingOrderId: data.tStockingOrderId,
          itemImage: data.tPreregisteredItem.itemImageUrl,
          cateSmall: getCateSmallName(
            formOption.categorySmalls,
            data.tPreregisteredItem.mCateSmallId
          ),
          brand: getBrandName(
            formOption.brands,
            data.tPreregisteredItem.mBrandId
          ),
          color: getColorName(
            formOption.colors,
            data.tPreregisteredItem.mColorId
          ),
          subColor: getSubColorName(
            formOption.colors,
            data.tPreregisteredItem.mSubColorId
          ),
          pattern: getPatternName(
            formOption.patterns,
            data.tPreregisteredItem.mPatternId
          ),
          logo: getLogoName(formOption.logos, data.tPreregisteredItem.mLogoId),
          originalSize: selectedSize,
          dropSize: DROP_SIZE[data.tPreregisteredItem.dropSize],
          size: undefined,
          adminId: undefined,
          isRegistered: false,
          shoulder: null,
          bust: null,
          waist: null,
          minWaist: null,
          maxWaist: null,
          lengthTop: null,
          roundNeck: null,
          hip: null,
          roundLeg: null,
          lengthWaist: null,
          outseam: null,
          sleeveLength: null,
          hemWidth: null,
        },
      ],
    });
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
      lengthWaist: card.lengthWaist,
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

  const duplicateCard = (data: TItemsShowResponse[]) => {
    dispatch({
      type: "ADD_CARD",
      value: data.map((item: TItemsShowResponse) => {
        return {
          ...item,
          stockingOrderId: item.tStockingOrderId,
          itemImage: item.itemImageUrl,
          itemId: item.id,
          cateSmall: item.mCateSmall.name,
          brand: item.mBrand.name,
          color: item.mColor.name,
          subColor: item.mSubColor?.name ?? "無し",
          pattern: item.mPattern.name,
          logo: item.mLogo.name,
          originalSize: ORIGINAL_SIZE_LABEL[
            item.originalSize as keyof typeof ORIGINAL_SIZE_LABEL
          ] as TSize,
          dropSize: item.dropSize.name,
          size: item.size,
          adminId: item.tAdmin.id,
          isRegistered: true,
        };
      }),
    });
  };

  const deleteCard = (cardId: number) => {
    dispatch({
      type: "DELETE_CARD",
      value: cardId,
    });
    setOperationTargetCardId(undefined);
  };

  const copyCard = (cardId: number, selectedSize: TSize) => {
    const copyTargetCardState = cardsState.find((cardState, index) => {
      if (index === cardId) return cardState;
    });

    if (copyTargetCardState)
      dispatch({
        type: "ADD_CARD",
        value: [
          {
            ...copyTargetCardState,
            isRegistered: false,
            originalSize: selectedSize,
            size: selectedSize,
          },
        ],
      });
  };

  return (
    <>
      {operationTargetCardId !== undefined && (
        <ItemOperationDialog
          cardId={operationTargetCardId}
          cardsState={cardsState}
          onCloseDialog={() => setOperationTargetCardId(undefined)}
          deleteCard={deleteCard}
          copyCard={copyCard}
        />
      )}

      {copyTargetCardId !== undefined && (
        <ItemCopyDialog
          cardId={copyTargetCardId}
          onCloseDialog={() => setCopyTargetCardId(undefined)}
          cardsState={cardsState}
          copyCard={copyCard}
        />
      )}
      {duplicationTargetItemId && (
        <ItemDuplicationDialog
          cardId={duplicationTargetItemId}
          onCloseDialog={() => {
            setDuplicationTargetItemId(undefined);
          }}
          duplicateCard={duplicateCard}
          adminOption={formOption.admins}
        />
      )}
      {selectedCardId !== undefined && selectedCardState !== undefined ? (
        <SizeMeasurementSwitcher
          cardState={selectedCardState}
          onClose={() => setSelectedCardId(undefined)}
          arrivalSize={selectedCardState.originalSize}
          formOption={formOption}
          onCreateOrUpdateCardState={handleCreateOrUpdateCardState}
        />
      ) : (
        <>
          <Header title={"アイテム登録"} />
          <Box maxHeight="100vh" overflow="auto">
            <RegisteredItemCardList
              cardInfo={cardInfo}
              onClick={(cardId: number) => {
                setSelectedCardId(cardId);
              }}
              onLongPress={(cardId: number) => {
                setOperationTargetCardId(cardId);
              }}
            />
          </Box>
          <PreregisteredItemFetcher
            onSetDuplicationTargetItemId={(itemId: number | undefined) =>
              setDuplicationTargetItemId(itemId)
            }
            createNewCard={createNewCard}
          />
        </>
      )}
    </>
  );
}
