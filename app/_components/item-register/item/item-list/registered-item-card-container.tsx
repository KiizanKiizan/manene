import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import { TPreregisteredDataCountRegisteredResponse } from "@/app/_api/item_register/preregistered_data/usePreregisteredDataCountRegistered";
import { TPreregisteredDataResponse } from "@/app/_api/item_register/preregistered_data/usePreregisteredDataShow";
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
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useReducer, useState } from "react";
import ItemDuplicationDialog from "../item-duplication-dialog";
import SizeMeasurementSwitcher from "../item-info/size-measurement-switcher";
import SizeSelectionDialog from "../size-selection-dialog";
import RegisteredItemCardList, { TCardInfo } from "./registered-item-card-list";

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
} & TMeasurement;

export type TUpdateActionValue = {
  itemId: number;
  adminId: number;
  size: string;
} & TMeasurement;

type TCardsAction =
  | {
      type: "CREATE_CARD";
      value: TCardsState;
    }
  | {
      type: "DELETE_CARD";
      value: number;
    }
  | {
      type: "UPDATE_CARD";
      value: TUpdateActionValue;
    }
  | {
      type: "Duplicate_CARD";
      value: TCardsState[];
    };

type TProps = {
  formOption: TFormOptionIndexResponse;
  preregisteredData: TPreregisteredDataResponse;
  countRegisteredData: TPreregisteredDataCountRegisteredResponse;
};

export default function RegisteredItemCardContainer({
  formOption,
  preregisteredData,
  countRegisteredData,
}: TProps) {
  const [isSizeSelectionDialogOpen, setIsSizeSelectionDialogOpen] =
    useState<boolean>(true);
  const [selectedRegisterSize, setSelectedRegisterSize] = useState<string>();
  const [selectedCardId, setSelectedCardId] = useState<number>();
  const [deleteTargetCardId, setDeleteTargetCardId] = useState<number>();
  const [selectedAdminId, setSelectedAdminId] = useState<number>(2);
  const [selectedCreateNum, setSelectedCreateNum] = useState<number>(1);

  const initialCardsState = [
    {
      stockingOrderId: preregisteredData.tStockingOrderId,
      itemImage: preregisteredData.tPreregisteredItem.itemImageUrl,
      itemId: undefined,
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
      originalSize: selectedRegisterSize as string, // 後で修正必要
      dropSize: DROP_SIZE[preregisteredData.tPreregisteredItem.dropSize],
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
      outseam: null,
      sleeveLength: null,
      hemWidth: null,
    },
  ];

  const cardsStateReducer = (
    cardsState: TCardsState[],
    action: TCardsAction
  ) => {
    switch (action.type) {
      case "CREATE_CARD":
        return [...cardsState, action.value];
      case "UPDATE_CARD":
        // cardsStateの中のaction.value番目の要素のみを更新する
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

  const [cardsState, dispatch] = useReducer(
    cardsStateReducer,
    initialCardsState
  );

  const handleCreateCardState = (args: TCardsState) => {
    dispatch({
      type: "CREATE_CARD",
      value: args,
    });
  };
  const handleUpdateCardState = (args: TUpdateActionValue) => {
    dispatch({
      type: "UPDATE_CARD",
      value: {
        itemId: args.itemId,
        adminId: args.adminId,
        size: args.size,
        shoulder: args.shoulder,
        bust: args.bust,
        waist: args.waist,
        minWaist: args.minWaist,
        maxWaist: args.maxWaist,
        lengthTop: args.lengthTop,
        roundNeck: args.roundNeck,
        hip: args.hip,
        roundLeg: args.roundLeg,
        outseam: args.outseam,
        sleeveLength: args.sleeveLength,
        hemWidth: args.hemWidth,
      },
    });
  };

  const haveAlreadyRegisteredItem = (): boolean => {
    switch (selectedRegisterSize) {
      case "S":
        return !!preregisteredData.smallRefItemId;
      case "M":
        return !!preregisteredData.mediumRefItemId;
      case "L":
        return !!preregisteredData.largeRefItemId;
      case "XL":
        return !!preregisteredData.extraLargeRefItemId;
      default:
        return false;
    }
  };

  // const handleClickDuplicate = () => {
  //   if (deleteTargetCardId) {
  //     postItemsDuplicate({
  //       id: deleteTargetCardId,
  //       createNum: selectedCreateNum,
  //       tAmiId: selectedAdminId,
  //     }).then((res) => {});
  //   }
  // };

  const cardInfo: TCardInfo[] = cardsState.map((card, index) => {
    const adminName: string =
      formOption.admins.find((admin) => {
        return admin.value === card.adminId;
      })?.name ?? "";

    const registeredContentMessage = getRegisteredContentMessage({
      itemId: card.itemId,
      cateSmall: card.cateSmall,
      brand: card.brand,
      color: card.color,
      subColor: card.subColor,
      pattern: card.pattern,
      logo: card.logo,
      originalSize: card.originalSize,
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
      originalSize: card.originalSize,
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
      {selectedRegisterSize ? (
        haveAlreadyRegisteredItem() ? (
          <ItemDuplicationDialog
            adminOption={formOption.admins}
            selectedCreateNum={selectedCreateNum}
            selectedAdminId={selectedAdminId}
            onChangeSelectedCreateNum={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setSelectedCreateNum(
                isNaN(Number(e.target.value)) ? 1 : Number(e.target.value)
              )
            }
            onChangeAdminId={(e: SelectChangeEvent<number>) =>
              setSelectedCreateNum(
                isNaN(Number(e.target.value)) ? 2 : Number(e.target.value)
              )
            }
            onClose={() => setSelectedRegisterSize(undefined)}
            onClickAdd={}
          />
        ) : selectedCardId && selectedCardState ? (
          <SizeMeasurementSwitcher
            cardState={selectedCardState}
            arrivalSize={selectedRegisterSize}
            formOption={formOption}
            onClose={() => setSelectedRegisterSize(undefined)}
            onUpdateCardState={handleUpdateCardState}
          />
        ) : (
          <RegisteredItemCardList
            cardInfo={cardInfo}
            onClick={(cardId: number) => {
              setSelectedCardId(cardId);
            }}
            onLongPress={function (cardId: number): void {
              throw new Error("Function not implemented.");
            }}
          />
        )
      ) : (
        <SizeSelectionDialog
          stockingId={countRegisteredData.stockingId}
          arrivedSmallNum={countRegisteredData.arrivedSmallNum}
          arrivedMediumNum={countRegisteredData.arrivedMediumNum}
          arrivedLargeNum={countRegisteredData.arrivedLargeNum}
          arrivedExtraLargeNum={countRegisteredData.arrivedExtraLargeNum}
          registeredSmallNum={countRegisteredData.registeredSmallNum}
          registeredMediumNum={countRegisteredData.registeredMediumNum}
          registeredLargeNum={countRegisteredData.registeredLargeNum}
          registeredExtraLargeNum={countRegisteredData.registeredExtraLargeNum}
          onClickSize={(size: string) => setSelectedRegisterSize(size)}
          onClose={() => setIsSizeSelectionDialogOpen(false)}
        />
      )}
    </>
  );
}
