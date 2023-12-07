import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import {
  TCardsState,
  TUpdateActionValue,
} from "../item-list/registered-item-card-container";
import SizeMeasurementFetcher from "./size-measurement-fetcher";
import SizeMeasurementInputsFetcher from "./size-measurement-inputs-fetcher";

type TProps = {
  cardState: TCardsState;
  arrivalSize: string;
  formOption: TFormOptionIndexResponse;
  onClose: () => void;
  onCreateCardState: (args: TCardsState) => void;
  onUpdateCardState: (args: TUpdateActionValue) => void;
};
export default function SizeMeasurementSwitcher({
  cardState,
  arrivalSize,
  formOption,
  onClose,
  onCreateCardState,
  onUpdateCardState,
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

  return (
    <>
      {cardState.isRegistered ? (
        <SizeMeasurementFetcher
          stockingOrderId={cardState.stockingOrderId}
          itemData={itemData}
          itemImagePath={cardState.itemImage}
          adminOptions={formOption.admins}
          onCloseItemInfo={onClose}
          onCreateCardState={onCreateCardState}
          onUpdateCardState={onUpdateCardState}
          itemId={0}
          adminId={0}
        />
      ) : (
        <SizeMeasurementInputsFetcher
          stockingOrderId={cardState.stockingOrderId}
          itemData={itemData}
          itemImagePath={cardState.itemImage}
          adminOptions={formOption.admins}
          onCloseItemInfo={onClose}
          onCreateCardState={onCreateCardState}
          onUpdateCardState={onUpdateCardState}
          arrivalSize={arrivalSize}
        />
      )}
    </>
  );
}
