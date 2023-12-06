import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import { TCardsState } from "../item-list/registered-item-card-container";
import SizeMeasurementFetcher from "./size-measurement-fetcher";
import SizeMeasurementInputsFetcher from "./size-measurement-inputs-fetcher";

type TProps = {
  cardState: TCardsState;
  arrivalSize: string;
  formOption: TFormOptionIndexResponse;
  onClose: () => void;
};
export default function SizeMeasurementSwitcher({
  cardState,
  arrivalSize,
  formOption,
  onClose,
}: TProps) {
  const itemData = [
    {
      name: "小カテ",
      value:
        formOption.categorySmalls.find(
          (categorySmall) => categorySmall.value === cardState.cateSmallId
        )?.name ?? "",
    },
    {
      name: "ブランド",
      value:
        formOption.brands.find((brand) => brand.value === cardState.brandId)
          ?.name ?? "",
    },
    {
      name: "カラー",
      value:
        formOption.colors.find((color) => color.value === cardState.colorId)
          ?.name ?? "",
    },
    {
      name: "サブカラー",
      value:
        formOption.colors.find((color) => color.value === cardState.subColorId)
          ?.name ?? "",
    },
    {
      name: "柄",
      value:
        formOption.patterns.find(
          (pattern) => pattern.value === cardState.patternId
        )?.name ?? "",
    },
    {
      name: "ロゴ",
      value:
        formOption.logos.find((logo) => logo.value === cardState.logoId)
          ?.name ?? "",
    },
    {
      name: "Dropサイズ",
      value:
        formOption.dropSizes.find((drop) => drop.value === cardState.dropSizeId)
          ?.name ?? "",
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
          arrivalSize={arrivalSize}
        />
      )}
    </>
  );
}
