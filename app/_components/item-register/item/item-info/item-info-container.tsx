import { TOption } from "@/app/_api/item_register/form/getFormOptionIndex";
import { TMeasurementInput } from "@/app/_api/size_measurement/getSizeMeasurementIndex";
import DisableBackDialog from "@/app/_components/common/dialog/disable-back-dialog";
import SizeMeasurementsEditForm from "@/app/_components/size_measurements/[id]/size-measurement-edit-form";
import useSizeMeasurementHandler from "@/app/_utils/hooks/useSizeMeasurementHandler";
import { Box, DialogContent } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import AdminList from "./admin-list";
import ItemInfoList, { TItemData } from "./item-info-list";

type TProps = {
  measurementInputData: TMeasurementInput;
  itemData: TItemData[];
  itemImagePath: string;
  adminOptions: TOption[];
  arrivalSize: string;
};

export default function ItemInfoContainer({
  measurementInputData,
  itemData,
  itemImagePath,
  adminOptions,
  arrivalSize,
}: TProps) {
  const {
    size,
    rank,
    formData,
    measurement,
    selectedPartId,
    optionDetails,
    handleChangeMeasurement,
    handleChangeRank,
    handleChangeSize,
    handleClickEnter,
    handleClickSkip,
    handleClickSelect,
  } = useSizeMeasurementHandler({ measurementInputData: measurementInputData });
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState<boolean>(false);
  const [selectedAdminId, setSelectedAdminId] = useState<number>();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    measurementInputData.size
  );
  const [isSizeMeasurementDialogOpen, setIsSizeMeasurementDialogOpen] =
    useState<boolean>(false);

  const adminName = adminOptions.find(
    (admin) => admin.value === selectedAdminId
  )?.name;

  const partSize = [
    { partName: "肩", partSize: formData.newMeasurement.shoulder },
    { partName: "身幅", partSize: formData.newMeasurement.bust },
    { partName: "着丈", partSize: formData.newMeasurement.lengthTop },
    { partName: "首", partSize: formData.newMeasurement.roundNeck },
    { partName: "ウエスト", partSize: formData.newMeasurement.waist },
    { partName: "ヒップ", partSize: formData.newMeasurement.hip },
    { partName: "もも", partSize: formData.newMeasurement.roundLeg },
    { partName: "総丈", partSize: formData.newMeasurement.outseam },
    { partName: "裄丈", partSize: formData.newMeasurement.sleeveLength },
    { partName: "裾幅", partSize: formData.newMeasurement.hemWidth },
  ].filter((v) => {
    return v.partSize !== null && v.partSize !== undefined;
  }) as { partName: string; partSize: number }[];
  return (
    <>
      <Box display="flex" justifyContent="center" padding={3}>
        <Image alt="item_image" src={itemImagePath} width={130} height={190} />
      </Box>
      <ItemInfoList
        itemData={itemData}
        size={selectedSize}
        partSize={partSize}
        adminName={adminName}
        onClickAdminSection={() => setIsAdminDialogOpen(true)}
        onClickSizeMeasurement={() => setIsSizeMeasurementDialogOpen(true)}
      />
      {isAdminDialogOpen && (
        <DisableBackDialog
          open={isAdminDialogOpen}
          onClose={() => setIsAdminDialogOpen(false)}
        >
          <DialogContent>
            <AdminList
              adminOptions={adminOptions}
              onClickAdmin={(id: number) => {
                setSelectedAdminId(id);
                setIsAdminDialogOpen(false);
              }}
              selectedAdminId={selectedAdminId}
            />
          </DialogContent>
        </DisableBackDialog>
      )}
      {isSizeMeasurementDialogOpen && (
        <DisableBackDialog
          open={isSizeMeasurementDialogOpen}
          onClose={() => setIsSizeMeasurementDialogOpen(false)}
        >
          <SizeMeasurementsEditForm
            size={size ?? arrivalSize}
            rank={rank}
            measurement={measurement}
            optionDetails={optionDetails}
            selectedPartId={selectedPartId}
            isLoading={false}
            onChangeMeasurement={handleChangeMeasurement}
            onChangeSize={handleChangeSize}
            onChangeRank={handleChangeRank}
            onClickEnter={handleClickEnter}
            onClickSelect={handleClickSelect}
            onClickSkip={handleClickSkip}
            onClickConfirm={() => {
              setSelectedSize(size);
              setIsSizeMeasurementDialogOpen(false);
            }}
          />
        </DisableBackDialog>
      )}
    </>
  );
}
