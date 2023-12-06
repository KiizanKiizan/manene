import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import { TPreregisteredDataCountRegisteredResponse } from "@/app/_api/item_register/preregistered_data/usePreregisteredDataCountRegistered";
import { TPreregisteredDataResponse } from "@/app/_api/item_register/preregistered_data/usePreregisteredDataShow";
import { TMeasurement } from "@/app/_api/items/itemsShowResponse";
import { DROP_SIZE } from "@/app/_constants/drop-size";
import {
  getRegisteredContentMessage,
  getRegisteredSizeMessage,
} from "@/app/_service/item-register/getItemCardMessages";
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
  cateSmallId: number;
  brandId: number;
  colorId: number;
  subColorId?: number;
  patternId: number;
  logoId: number;
  originalSize: string;
  dropSizeId: keyof typeof DROP_SIZE;
  size?: string;
  adminId?: number;
  isRegistered: boolean;
} & TMeasurement;

type TUpdateAction = {
  cardId: number;
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
      type: "DELETE_CARD";
      value: number;
    }
  | {
      type: "UPDATE_CARD";
      value: TUpdateAction;
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

  // const initialRegisteredContentMessage = getRegisteredContentMessage({
  //   cateSmall: getCateSmallName(
  //     preregisteredData.tPreregisteredItem.mCateSmallId
  //   ),
  //   brand: getBrandName(preregisteredData.tPreregisteredItem.mBrandId),
  //   color: getColorName(preregisteredData.tPreregisteredItem.mColorId),
  //   subColor: getSubColorName(preregisteredData.tPreregisteredItem.mSubColorId),
  //   pattern: getPatternName(preregisteredData.tPreregisteredItem.mPatternId),
  //   logo: getLogoName(preregisteredData.tPreregisteredItem.mLogoId),
  //   originalSize: selectedRegisterSize as string, // 後で修正必要
  // });

  // const initialRegisteredSizeMessage = getRegisteredSizeMessage({
  //   shoulder: null,
  //   bust: null,
  //   waist: null,
  //   minWaist: null,
  //   maxWaist: null,
  //   lengthTop: null,
  //   roundNeck: null,
  //   hip: null,
  //   roundLeg: null,
  //   outseam: null,
  //   sleeveLength: null,
  //   hemWidth: null,
  //   size: undefined,
  //   originalSize: selectedRegisterSize as string, // 後で修正必要
  //   dropSize: preregisteredData.tPreregisteredItem
  //     .dropSize as keyof typeof DROP_SIZE,
  // });

  const initialCardsState = [
    {
      stockingOrderId: preregisteredData.tStockingOrderId,
      itemImage: preregisteredData.tPreregisteredItem.itemImageUrl,
      itemId: undefined,
      cateSmallId: preregisteredData.tPreregisteredItem.mCateSmallId,
      brandId: preregisteredData.tPreregisteredItem.mBrandId,
      colorId: preregisteredData.tPreregisteredItem.mColorId,
      subColorId: preregisteredData.tPreregisteredItem.mSubColorId,
      patternId: preregisteredData.tPreregisteredItem.mPatternId,
      logoId: preregisteredData.tPreregisteredItem.mLogoId,
      originalSize: selectedRegisterSize as string, // 後で修正必要
      dropSizeId: preregisteredData.tPreregisteredItem.dropSize,
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
      case "UPDATE_CARD":
        // cardsStateの中のaction.value番目の要素のみを更新する
        return cardsState.map((cardState, index) => {
          if (index === action.value.cardId) {
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

  // const cardInfo: TCardInfo[] = cardsState.map(
  //   (cardState: Omit<TCardInfo, "cardId">, index: number) => {
  //     return {
  //       cardId: index,
  //       itemImage: cardsState.itemImage,
  //       adminName: cardsState.adminName,
  //       registeredContent: cardsState.registeredContent,
  //       registeredSize: cardsState.registeredSize,
  //       isRegistered: cardsState.isRegistered,
  //     };
  //   }
  // );

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

    const getCateSmallName = (cateSmallId: number): string => {
      return (
        formOption.categorySmalls.find((cateSmall) => {
          return cateSmall.value === cateSmallId;
        })?.name ?? ""
      );
    };

    const getBrandName = (brandId: number): string => {
      return (
        formOption.brands.find((brand) => {
          return brand.value === brandId;
        })?.name ?? ""
      );
    };

    const getColorName = (colorId: number): string => {
      return (
        formOption.colors.find((color) => {
          return color.value === colorId;
        })?.name ?? ""
      );
    };

    const getSubColorName = (subColorId?: number): string => {
      if (subColorId === undefined) return "";
      return (
        formOption.colors.find((color) => {
          return color.value === subColorId;
        })?.name ?? ""
      );
    };

    const getPatternName = (patternId: number): string => {
      return (
        formOption.patterns.find((pattern) => {
          return pattern.value === patternId;
        })?.name ?? ""
      );
    };

    const getLogoName = (logoId: number): string => {
      return (
        formOption.logos.find((logo) => {
          return logo.value === logoId;
        })?.name ?? ""
      );
    };

    const registeredContentMessage = getRegisteredContentMessage({
      itemId: card.itemId,
      cateSmall: getCateSmallName(card.cateSmallId),
      brand: getBrandName(card.brandId),
      color: getColorName(card.colorId),
      subColor: getSubColorName(card.subColorId),
      pattern: getPatternName(card.patternId),
      logo: getLogoName(card.logoId),
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
      dropSize: card.dropSizeId,
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
