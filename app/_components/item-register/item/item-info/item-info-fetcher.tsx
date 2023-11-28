import useSizeMeasurementInputsIndex from "@/app/_api/item_register/form/useSizeMeasurementInputsIndex";
import { TOption } from "@/app/_api/judge_throw_away/getJudgeThrowAwayOptions";
import LoadingDialog from "@/app/_components/common/dialog/loading-dialog";
import ItemInfoContainer from "./item-info-container";
import { TItemData } from "./item-info-list";

type TProps = {
  stockingOrderId: number;
  itemData: TItemData[]; //自分で作る
  itemImagePath: string; //stgのやつ
  adminOptions: TOption[]; //example
  arrivalSize: string; //適当
};

export default function ItemInfoFetcher({
  stockingOrderId,
  itemData,
  itemImagePath,
  adminOptions,
  arrivalSize,
}: TProps) {
  const { data, isLoading, error } = useSizeMeasurementInputsIndex({
    stockingOrderId: stockingOrderId,
  });

  if (isLoading || !data) return <LoadingDialog isOpen />;
  if (error) {
    alert((error.response?.data as { message: string })?.message);
  }

  return (
    <ItemInfoContainer
      measurementInputData={data.input}
      itemData={itemData}
      itemImagePath={itemImagePath}
      adminOptions={adminOptions}
      arrivalSize={arrivalSize}
    />
  );
}
