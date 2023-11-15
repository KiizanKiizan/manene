"use client";
import fetchSizeStableShow from "@/app/_api/size_measurement/fetchSizeStableShow";
import { TSizeMeasurementIndexResponse } from "@/app/_api/size_measurement/getSizeMeasurementIndex";
import useSizeMeasurementUpdate, {
  TSizePartsParams,
} from "@/app/_api/size_measurement/useSizeMeasurementUpdate";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useReducer, useState } from "react";
import ItemDetailFetcher from "../../item-location/item-detail-fetcher";
import SizeMeasurementsEditForm from "./size-measurement-edot-form";

type TProps = {
  measurementData: TSizeMeasurementIndexResponse;
};

type FormAction = {
  type: "SET_VALUE";
  field: keyof TSizePartsParams;
  value: number;
};

type TFormData = TSizePartsParams & {
  newMeasurement: Record<keyof TSizePartsParams, number | undefined>;
  actionMessage: Record<keyof TSizePartsParams, string | undefined>;
};

const partName = {
  1: "胸", // BUST
  2: "着丈", // LENGTH_TOP
  3: "首", // ROUND_NECK
  5: "ウエスト", // WAIST
  12: "最小ウエスト", // MIN_WAIST
  6: "最大ウエスト", // MAX_WAIST
  7: "ヒップ", // HIP
  8: "もも", // ROUND_LEG
  13: "総丈", // OUTSEAM
  14: "裄丈", // SLEEVE_LENGTH
  15: "裾幅", // HEM_WIDTH
};

const partKeyName = {
  1: "bust", // BUST
  2: "lengthTop", // LENGTH_TOP
  3: "roundNeck", // ROUND_NECK
  5: "waist", // WAIST
  12: "minWaist", // MIN_WAIST
  6: "maxWaist", // MAX_WAIST
  7: "hip", // HIP
  8: "roundLeg", // ROUND_LEG
  13: "outseam", // OUTSEAM
  14: "sleeveLength", // SLEEVE_LENGTH
  15: "hemWidth", // HEM_WIDTH
};

export default function SizeMeasurementEditContainer({
  measurementData,
}: TProps) {
  const router = useRouter();
  const [size, setSize] = useState<string>(measurementData.input.size);
  const [rank, setRank] = useState<string>(measurementData.input.rank);
  const [measurement, setMeasurement] = useState<number>();
  const [selectedPartId, setSelectedPartId] = useState<number>(
    measurementData.input.measurements[0].part
  );
  const [isSizeStableConfirmDialogOpen, setIsSizeStableConfirmDialogOpen] =
    useState<boolean>(measurementData.input.isSizeStable);
  const [isSizeStableAlertDialogOpen, setIsSizeStableAlertDialogOpen] =
    useState<boolean>(false);
  const [isItemDetailCardOpen, setIsItemDetailCardOpen] =
    useState<boolean>(false);

  const { mutate, isLoading } = useSizeMeasurementUpdate(
    measurementData.itemId
  );

  const initialFormData: TFormData = {
    newMeasurement: {
      bust: undefined,
      lengthTop: undefined,
      roundNeck: undefined,
      waist: undefined,
      maxWaist: undefined,
      hip: undefined,
      roundLeg: undefined,
      outseam: undefined,
      sleeveLength: undefined,
      hemWidth: undefined,
      minWaist: undefined,
    },
    actionMessage: {
      bust: undefined,
      lengthTop: undefined,
      roundNeck: undefined,
      waist: undefined,
      maxWaist: undefined,
      hip: undefined,
      roundLeg: undefined,
      outseam: undefined,
      sleeveLength: undefined,
      hemWidth: undefined,
      minWaist: undefined,
    },
  };

  const getActionMessage = (
    fieldName: keyof TSizePartsParams,
    value: number
  ) => {
    return "スキップ";
  };

  const formReducer = (formData: TFormData, action: FormAction) => {
    const actionMessage = getActionMessage(action.field, action.value);
    switch (action.type) {
      case "SET_VALUE":
        return {
          ...formData,
          newMeasurement: {
            ...formData.newMeasurement,
            [action.field]: action.value,
          },
          actionMessage: {
            ...formData.actionMessage,
            [action.field]: actionMessage,
          },
        };
      default:
        throw new Error("存在しないactionです");
    }
  };

  const isParams = (name: string): name is keyof TSizePartsParams => {
    return name in initialFormData.newMeasurement;
  };

  const handleChangeMeasurement = (measurement: string) => {
    parseInt(measurement)
      ? setMeasurement(parseInt(measurement))
      : setMeasurement(undefined);
  };

  const moveToNextPart = () => {
    const index = measurementData.input.measurements.findIndex(
      (data) => data.part === selectedPartId
    );
    const nextIndex =
      index === measurementData.input.measurements.length - 1 ? 0 : index + 1;
    setMeasurement(undefined);
    setSelectedPartId(measurementData.input.measurements[nextIndex].part);
  };

  const handleClickUpdate = () => {
    mutate(
      {
        size: size,
        rank: rank,
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
          fetchSizeStableShow({ itemId: measurementData.itemId }).then(
            (res) => {
              if (res.isSizeStableAfterMeasurement) {
                setIsSizeStableAlertDialogOpen(true);
              }
            }
          );
        },
      }
    );
  };

  const handleClickEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (measurement !== undefined) {
        if (
          !isParams(
            partKeyName[
              selectedPartId as keyof typeof partKeyName
            ] as keyof TSizePartsParams
          )
        ) {
          throw new Error("存在しない部位です");
        }
        dispatch({
          type: "SET_VALUE",
          field: partKeyName[
            selectedPartId as keyof typeof partKeyName
          ] as keyof TSizePartsParams,
          value: measurement,
        });
      }
      moveToNextPart();
    }
  };

  const handleClickSkip = () => {
    dispatch({
      type: "SET_VALUE",
      field: partKeyName[
        selectedPartId as keyof typeof partKeyName
      ] as keyof TSizePartsParams,
      value: measurementData.input.measurements.find(
        (data) => data.part === selectedPartId
      )?.value as number,
    });
    moveToNextPart();
  };

  const [formData, dispatch] = useReducer(formReducer, initialFormData);

  const optionDetails = measurementData.input.measurements.map((data) => {
    const partKey = partKeyName[data.part as keyof typeof partKeyName];
    return {
      id: data.part,
      partName: partName[data.part as keyof typeof partName],
      preMeasurement: data.value,
      newMeasurement:
        formData.newMeasurement[partKey as keyof TSizePartsParams],
      actionMessage: formData.actionMessage[partKey as keyof TSizePartsParams],
    };
  });

  return (
    <>
      <Dialog open={isSizeStableConfirmDialogOpen}>
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
      </Dialog>
      <Dialog open={isSizeStableAlertDialogOpen}>
        <DialogTitle>サイズが確定しました</DialogTitle>
        <DialogContent>アイテムの最大計測回数を超えました。</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSizeStableAlertDialogOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <SizeMeasurementsEditForm
        size={size}
        rank={rank}
        measurement={measurement}
        optionDetails={optionDetails}
        selectedPartId={selectedPartId}
        isLoading={isLoading}
        onChangeMeasurement={handleChangeMeasurement}
        onChangeSize={(e) => setSize(e.target.value)}
        onChangeRank={(e) => setRank(e.target.value)}
        onClickEnter={handleClickEnter}
        onClickSelect={(id: number) => setSelectedPartId(id)}
        onClickUpdate={handleClickUpdate}
        onClickSkip={handleClickSkip}
      />
      {isItemDetailCardOpen && (
        <ItemDetailFetcher
          itemId={measurementData.itemId}
          onClickClose={() => setIsItemDetailCardOpen(false)}
        />
      )}
    </>
  );
}
