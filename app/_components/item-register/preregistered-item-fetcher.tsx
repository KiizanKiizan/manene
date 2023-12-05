import { TFormOptionIndexResponse } from "@/app/_api/item_register/form/getFormOptionIndex";
import usePreregisteredDataShow from "@/app/_api/item_register/preregistered_data/usePreregisteredDataShow";
import LoadingDialog from "../common/dialog/loading-dialog";
import PreregisteredItemCountRegisteredFetcher from "./preregistered_item_count_registered_fetcher";

type TProps = {
  formOption: TFormOptionIndexResponse;
  stockingOrderId: string;
};

export default function PreregisteredItemFetcher({
  formOption,
  stockingOrderId,
}: TProps) {
  const { data, isLoading, error } = usePreregisteredDataShow({
    id: stockingOrderId,
  });
  if (isLoading || !data) return <LoadingDialog isOpen />;
  if (error) {
    alert((error.response?.data as { message: string })?.message);
  }

  return (
    <PreregisteredItemCountRegisteredFetcher
      formOption={formOption}
      preregisteredData={data}
    />
  );
}
