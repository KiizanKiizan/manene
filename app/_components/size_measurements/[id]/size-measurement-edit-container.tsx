"use client";
import fetchSizeStableShow, {
  TSizeStableShowResponse,
} from "@/app/_api/size_measurement/fetchSizeStableShow";
import { TSizeMeasurementIndexResponse } from "@/app/_api/size_measurement/getSizeMeasurementIndex";
import useSizeMeasurementUpdate from "@/app/_api/size_measurement/useSizeMeasurementUpdate";
import useSizeMeasurementHandler from "@/app/_utils/hooks/useSizeMeasurementHandler";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DisableBackDialog from "../../common/dialog/disable-back-dialog";
import ItemDetailFetcher from "../../item-location/item-detail-fetcher";
import SizeMeasurementsEditForm from "./size-measurement-edit-form";

type TProps = {
  measurementData: TSizeMeasurementIndexResponse;
};

export default function SizeMeasurementEditContainer({
  measurementData,
}: TProps) {
  const router = useRouter();
  const {
    size,
    rank,
    formData,
    measurement,
    selectedPartId,
    optionDetails,
    changedParts,
    handleChangeMeasurement,
    handleChangeRank,
    handleChangeSize,
    handleClickEnter,
    handleClickSkip,
    handleClickSelect,
  } = useSizeMeasurementHandler({
    measurementInputData: measurementData.input,
    itemId: measurementData.itemId,
  });
  const [isSizeStableConfirmDialogOpen, setIsSizeStableConfirmDialogOpen] =
    useState<boolean>(measurementData.input.isSizeStable);
  const [isSizeStableAlertDialogOpen, setIsSizeStableAlertDialogOpen] =
    useState<boolean>(false);
  const [isItemDetailCardOpen, setIsItemDetailCardOpen] =
    useState<boolean>(false);

  const { mutate, isLoading } = useSizeMeasurementUpdate(
    measurementData.itemId
  );

  const handleClickUpdate = () => {
    size !== null &&
      mutate(
        {
          size: size,
          rank: rank,
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
        {
          onSuccess() {
            setIsItemDetailCardOpen(true);
            fetchSizeStableShow({ itemId: measurementData.itemId })
              .then((res: TSizeStableShowResponse) => {
                if (res.isSizeStableAfterMeasurement) {
                  setIsSizeStableAlertDialogOpen(true);
                }
              })
              .catch((error: AxiosError) => {
                alert(
                  `エラー: ${
                    (error.response?.data as { message: string })?.message
                  }`
                );
              });
          },
          onError(error: AxiosError) {
            alert(
              `アイテムサイズの更新に失敗しました。 ${
                (error.response?.data as { message: string })?.message
              }`
            );
          },
        }
      );
  };

  return (
    <>
      <DisableBackDialog
        open={isSizeStableConfirmDialogOpen}
        onClose={() => setIsSizeStableConfirmDialogOpen(false)}
      >
        <DialogTitle>サイズ確定済み</DialogTitle>
        <DialogContent>サイズ計測を開始しますか？</DialogContent>
        <DialogActions>
          <Button onClick={() => router.push("/size_measurements")}>
            キャンセル
          </Button>
          <Button onClick={() => setIsSizeStableConfirmDialogOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </DisableBackDialog>

      <SizeMeasurementsEditForm
        size={size ?? ""}
        rank={rank}
        measurement={measurement}
        optionDetails={optionDetails}
        selectedPartId={selectedPartId}
        isLoading={isLoading}
        onChangeMeasurement={handleChangeMeasurement}
        onChangeSize={handleChangeSize}
        onChangeRank={handleChangeRank}
        onClickEnter={handleClickEnter}
        onClickSelect={handleClickSelect}
        onClickConfirm={handleClickUpdate}
        onClickSkip={handleClickSkip}
      />
      {isItemDetailCardOpen && (
        <ItemDetailFetcher
          itemId={measurementData.itemId}
          withButton
          changedParts={changedParts}
          isSizeChanged={measurementData.input.size !== size}
          isRankChanged={measurementData.input.rank !== rank}
          onClickClose={() => setIsItemDetailCardOpen(false)}
        />
      )}
      <DisableBackDialog
        open={isSizeStableAlertDialogOpen}
        onClose={() => setIsSizeStableAlertDialogOpen(false)}
        zIndex={1000}
      >
        <DialogTitle>サイズが確定しました</DialogTitle>
        <DialogContent>アイテムの最大計測回数を超えました。</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSizeStableAlertDialogOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </DisableBackDialog>
    </>
  );
}
