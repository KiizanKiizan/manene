import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import usePreregisteredDataCountRegistered from "@/app/_api/item_register/preregistered_data/usePreregisteredDataCountRegistered";
import { TPreregisteredDataResponse } from "@/app/_api/item_register/preregistered_data/usePreregisteredDataShow";
import LoadingDialog from "../common/dialog/loading-dialog";
import RegisteredItemCardContainer from "./item/item-list/registered-item-card-container";

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

  if (error) {
    `予期せぬエラーが発生しました ${
      (error.response?.data as { message: string })?.message
    }`;
  }
  if (isLoading || !data) return <LoadingDialog isOpen />;

  return (
    <RegisteredItemCardContainer
      formOption={formOption}
      preregisteredData={preregisteredData}
      countRegisteredData={data}
    />
  );
}
