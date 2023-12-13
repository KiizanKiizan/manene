import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import {
  TCardsState,
  TCreateOrUpdateActionValue,
  TSize,
} from "../../item-register-container";
import SizeMeasurementFetcher from "./size-measurement-fetcher";
import SizeMeasurementInputsFetcher from "./size-measurement-inputs-fetcher";

type TProps = {
  cardState: TCardsState;
  arrivalSize: TSize;
  formOption: TFormOptionIndexResponse;
  onClose: () => void;
  onCreateOrUpdateCardState: (args: TCreateOrUpdateActionValue) => void;
};
export default function SizeMeasurementSwitcher({
  cardState,
  arrivalSize,
  formOption,
  onClose,
  onCreateOrUpdateCardState,
}: TProps) {
  const itemData = [
    {
      name: "小カテ",
      value: cardState.cateSmall,
    },
    {
      name: "ブランド",
      value: cardState.brand,
    },
    {
      name: "カラー",
      value: cardState.color,
    },
    {
      name: "サブカラー",
      value: cardState.subColor ?? "無し",
    },
    {
      name: "柄",
      value: cardState.pattern,
    },
    {
      name: "ロゴ",
      value: cardState.logo,
    },
    {
      name: "Dropサイズ",
      value: cardState.dropSize,
    },
  ];

  const copiedItemMeasurementData = {
    shoulder: cardState.shoulder,
    bust: cardState.bust,
    waist: cardState.waist,
    minWaist: cardState.minWaist,
    maxWaist: cardState.maxWaist,
    hip: cardState.hip,
    lengthTop: cardState.lengthTop,
    roundNeck: cardState.roundNeck,
    roundLeg: cardState.roundLeg,
    outseam: cardState.outseam,
    sleeveLength: cardState.sleeveLength,
    hemWidth: cardState.hemWidth,
  };

  return (
    <>
      {cardState.isRegistered && cardState.itemId && cardState.adminId ? (
        <SizeMeasurementFetcher
          stockingOrderId={cardState.stockingOrderId}
          itemData={itemData}
          copiedItemMeasurementData={copiedItemMeasurementData}
          itemImagePath={cardState.itemImage}
          adminOptions={formOption.admins}
          onCloseItemInfo={onClose}
          onCreateOrUpdateCardState={onCreateOrUpdateCardState}
          itemId={cardState.itemId}
          adminId={cardState.adminId}
        />
      ) : (
        <SizeMeasurementInputsFetcher
          stockingOrderId={cardState.stockingOrderId}
          itemData={itemData}
          copiedItemMeasurementData={copiedItemMeasurementData}
          itemImagePath={cardState.itemImage}
          adminOptions={formOption.admins}
          onCloseItemInfo={onClose}
          onCreateOrUpdateCardState={onCreateOrUpdateCardState}
          adminId={cardState.adminId}
          arrivalSize={arrivalSize}
          copiedSize={cardState.size}
        />
      )}
    </>
  );
}
