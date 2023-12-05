import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import usePreregisteredDataCountRegistered from "@/app/_api/item_register/preregistered_data/usePreregisteredDataCountRegistered";
import { TPreregisteredDataResponse } from "@/app/_api/item_register/preregistered_data/usePreregisteredDataShow";
import LoadingDialog from "../common/dialog/loading-dialog";
import RegisteredItemCardList from "./item/item-list/registered-item-card-list";

type TProps = {
  formOption: TFormOptionIndexResponse;
  preregisteredData: TPreregisteredDataResponse;
};

export default function PreregisteredItemCountRegisteredFetcher({
  formOption,
  preregisteredData,
}: TProps) {
  const { data, isLoading, error } = usePreregisteredDataCountRegistered({
    id: preregisteredData.tStockingOrderId,
  });

  if (isLoading || !data) return <LoadingDialog isOpen />;
  if (error) {
    alert((error.response?.data as { message: string })?.message);
  }

  return (
    <RegisteredItemCardList
      cardInfo={[]}
      onClick={function (cardId: number): void {
        throw new Error("Function not implemented.");
      }}
      onLongPress={function (cardId: number): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
