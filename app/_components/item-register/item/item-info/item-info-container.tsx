import { TOption } from "@/app/_api/item_register/form/getFormOptionIndex";
import useItemsCreate from "@/app/_api/item_register/useItemsCreate";
import useItemsUpdate from "@/app/_api/item_register/useItemsUpdate";
import { TMeasurementInput } from "@/app/_api/size_measurement/getSizeMeasurementIndex";
import FooterButton from "@/app/_components/common/button/footer-button";
import DisableBackDialog from "@/app/_components/common/dialog/disable-back-dialog";
import LoadingDialog from "@/app/_components/common/dialog/loading-dialog";
import Header from "@/app/_components/common/pages/header";
import SizeMeasurementsEditForm from "@/app/_components/size_measurements/[id]/size-measurement-edit-form";
import { ORIGINAL_SIZE } from "@/app/_constants/original-size";
import useSizeMeasurementHandler, {
  partKeyName,
} from "@/app/_utils/hooks/useSizeMeasurementHandler";
import { Box, DialogContent, Typography } from "@mui/material";
import { AxiosError } from "axios";
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
  stockingOrderId: number;
  onCloseItemInfo: () => void;
  itemId?: number;
  adminId?: number;
};

export default function ItemInfoContainer({
  measurementInputData,
  itemData,
  itemImagePath,
  adminOptions,
  arrivalSize,
  stockingOrderId,
  onCloseItemInfo,
  itemId,
  adminId,
}: TProps) {
  const {
    size,
    rank,
    formData,
    measurement,
    selectedPartId,
    optionDetails,
    resetFromData,
    handleChangeMeasurement,
    handleChangeRank,
    handleChangeSize,
    handleClickEnter,
    handleClickSkip,
    handleClickSelect,
  } = useSizeMeasurementHandler({
    measurementInputData: measurementInputData,
    itemId: itemId,
    arrivalSize: arrivalSize,
  });
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState<boolean>(false);
  const [selectedAdminId, setSelectedAdminId] = useState<number | undefined>(
    adminId
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    measurementInputData.size
  );
  const [isSizeMeasurementDialogOpen, setIsSizeMeasurementDialogOpen] =
    useState<boolean>(false);
  const { mutate: createMutate, isLoading: isCreateLoading } = useItemsCreate();
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useItemsUpdate({
    id: itemId,
  });

  const handleClickUpdate = () => {
    if (selectedAdminId !== undefined && selectedSize !== null) {
      updateMutate(
        {
          sizeAttributes: {
            tAdminId: selectedAdminId,
            size: selectedSize,
            tStockingOrderId: stockingOrderId,
            originalSize:
              ORIGINAL_SIZE[arrivalSize as keyof typeof ORIGINAL_SIZE],
            shoulder: formData.newMeasurement.shoulder,
            bust: formData.newMeasurement.bust,
            lengthTop: formData.newMeasurement.lengthTop,
            roundNeck: formData.newMeasurement.roundNeck,
            waist: formData.newMeasurement.waist,
            maxWaist: formData.newMeasurement.maxWaist,
            minWaist: formData.newMeasurement.minWaist,
            hip: formData.newMeasurement.hip,
            roundLeg: formData.newMeasurement.roundLeg,
            outseam: formData.newMeasurement.outseam,
            sleeveLength: formData.newMeasurement.sleeveLength,
            hemWidth: formData.newMeasurement.hemWidth,
          },
        },
        {
          onSuccess() {
            onCloseItemInfo();
            // ここでアイテムカードにレスポンスをセットする処理を書く
          },
          onError(error: AxiosError) {
            alert(
              `アイテム情報更新に失敗しました。 ${
                (error.response?.data as { message: string })?.message
              }`
            );
          },
        }
      );
    }
  };

  const handleClickCreate = () => {
    if (selectedAdminId !== undefined && selectedSize !== null) {
      createMutate(
        {
          sizeAttributes: {
            tAdminId: selectedAdminId,
            size: selectedSize,
            tStockingOrderId: stockingOrderId,
            originalSize:
              ORIGINAL_SIZE[arrivalSize as keyof typeof ORIGINAL_SIZE],
            shoulder: formData.newMeasurement.shoulder,
            bust: formData.newMeasurement.bust,
            lengthTop: formData.newMeasurement.lengthTop,
            roundNeck: formData.newMeasurement.roundNeck,
            waist: formData.newMeasurement.waist,
            maxWaist: formData.newMeasurement.maxWaist,
            minWaist: formData.newMeasurement.minWaist,
            hip: formData.newMeasurement.hip,
            roundLeg: formData.newMeasurement.roundLeg,
            outseam: formData.newMeasurement.outseam,
            sleeveLength: formData.newMeasurement.sleeveLength,
            hemWidth: formData.newMeasurement.hemWidth,
          },
        },
        {
          onSuccess() {
            onCloseItemInfo();
            // ここでアイテムカードにレスポンスをセットする処理を書く
          },
          onError(error: AxiosError) {
            alert(
              `アイテム登録に失敗しました。 ${
                (error.response?.data as { message: string })?.message
              }`
            );
          },
        }
      );
    }
  };

  const adminName = adminOptions.find(
    (admin) => admin.value === selectedAdminId
  )?.name;

  const getPreMeasurement = (fieldName: string): number | undefined | null => {
    return measurementInputData.measurements.find(
      (data) => partKeyName[data.part as keyof typeof partKeyName] === fieldName
    )?.value;
  };

  const partSize = [
    {
      partName: "肩",
      partSize:
        formData.newMeasurement.shoulder ?? getPreMeasurement("shoulder"),
    },
    {
      partName: "身幅",
      partSize: formData.newMeasurement.bust ?? getPreMeasurement("bust"),
    },
    {
      partName: "着丈",
      partSize:
        formData.newMeasurement.lengthTop ?? getPreMeasurement("lengthTop"),
    },
    {
      partName: "首",
      partSize:
        formData.newMeasurement.roundNeck ?? getPreMeasurement("roundNeck"),
    },
    {
      partName: "ウエスト",
      partSize: formData.newMeasurement.waist ?? getPreMeasurement("waist"),
    },
    {
      partName: "ヒップ",
      partSize: formData.newMeasurement.hip ?? getPreMeasurement("hip"),
    },
    {
      partName: "もも",
      partSize:
        formData.newMeasurement.roundLeg ?? getPreMeasurement("roundLeg"),
    },
    {
      partName: "総丈",
      partSize: formData.newMeasurement.outseam ?? getPreMeasurement("outseam"),
    },
    {
      partName: "裄丈",
      partSize:
        formData.newMeasurement.sleeveLength ??
        getPreMeasurement("sleeveLength"),
    },
    {
      partName: "裾幅",
      partSize:
        formData.newMeasurement.hemWidth ?? getPreMeasurement("hemWidth"),
    },
  ].filter((v) => {
    return v.partSize !== null && v.partSize !== undefined;
  }) as { partName: string; partSize: number }[];

  return (
    <>
      <LoadingDialog isOpen={isCreateLoading || isUpdateLoading} />
      <Header title={itemId ? "アイテム編集" : "アイテム新規追加"}>
        <Typography>入荷サイズ：{arrivalSize}</Typography>
      </Header>
      <Box height="82vh" overflow="auto">
        <Box display="flex" justifyContent="center" padding={3}>
          <Image
            alt="item_image"
            src={itemImagePath}
            width={120}
            height={170}
          />
        </Box>
        <ItemInfoList
          itemData={itemData}
          size={selectedSize}
          partSize={partSize}
          adminName={adminName}
          onClickAdminSection={() => setIsAdminDialogOpen(true)}
          onClickSizeMeasurement={() => setIsSizeMeasurementDialogOpen(true)}
        />
      </Box>
      <FooterButton
        onClick={itemId ? handleClickUpdate : handleClickCreate}
        disabled={!selectedSize || selectedAdminId === undefined}
      >
        確定
      </FooterButton>

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
          onClose={() => {
            setIsSizeMeasurementDialogOpen(false);
            resetFromData();
          }}
          fullWidth={false}
          PaperProps={{
            style: {
              margin: 15,
            },
          }}
        >
          <SizeMeasurementsEditForm
            size={size}
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
