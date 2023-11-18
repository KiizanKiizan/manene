"use client";
import fetchSizeCalcIndex, {
  TSizeCalcIndexResponse,
} from "@/app/_api/size_measurement/fetchSizeCalcIndex";
import fetchSizeStableShow, {
  TSizeStableShowResponse,
} from "@/app/_api/size_measurement/fetchSizeStableShow";
import { TSizeMeasurementIndexResponse } from "@/app/_api/size_measurement/getSizeMeasurementIndex";
import useSizeMeasurementUpdate, {
  TSizePartsParams,
} from "@/app/_api/size_measurement/useSizeMeasurementUpdate";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useReducer, useState } from "react";
import DisableBackDialog from "../../common/dialog/disable-back-dialog";
import ItemDetailFetcher from "../../item-location/item-detail-fetcher";
import SizeMeasurementsEditForm from "./size-measurement-edit-form";

type TProps = {
  measurementData: TSizeMeasurementIndexResponse;
};

type FormAction = {
  type: "SET_VALUE";
  field: keyof TSizePartsParams;
  value: string | number;
};

type TFormData = TSizePartsParams & {
  newMeasurement: Record<keyof TSizePartsParams, number | undefined>;
  actionMessage: Record<keyof TSizePartsParams, string | undefined>;
};

const partName = {
  0: "肩",
  1: "身幅",
  2: "着丈",
  3: "首",
  5: "ウエスト",
  12: "最小ウエスト",
  6: "最大ウエスト",
  7: "ヒップ",
  8: "もも",
  13: "総丈",
  14: "裄丈",
  15: "裾幅",
};

const partKeyName = {
  0: "shoulder",
  1: "bust",
  2: "lengthTop",
  3: "roundNeck",
  5: "waist",
  12: "minWaist",
  6: "maxWaist",
  7: "hip",
  8: "roundLeg",
  13: "outseam",
  14: "sleeveLength",
  15: "hemWidth",
};

export default function SizeMeasurementEditContainer({
  measurementData,
}: TProps) {
  const router = useRouter();
  const [size, setSize] = useState<string>(measurementData.input.size);
  const [rank, setRank] = useState<string>(measurementData.input.rank);
  const [measurement, setMeasurement] = useState<string>();
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
      shoulder: undefined,
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
      shoulder: undefined,
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

  const moveToNextPart = () => {
    const index = measurementData.input.measurements.findIndex(
      (data) => data.part === selectedPartId
    );
    const nextIndex =
      index === measurementData.input.measurements.length - 1 ? 0 : index + 1;
    setMeasurement(undefined);
    setSelectedPartId(measurementData.input.measurements[nextIndex].part);
  };

  const isWithinOneError = (
    preMeasurement: number,
    newMeasurement: number
  ): boolean => {
    return (
      newMeasurement !== preMeasurement &&
      preMeasurement >= newMeasurement - 1 &&
      preMeasurement <= newMeasurement + 1
    );
  };

  const getPreMeasurement = (fieldName: string): number | undefined => {
    return measurementData.input.measurements.find(
      (data) => partKeyName[data.part as keyof typeof partKeyName] === fieldName
    )?.value;
  };

  const doubleTruncatedValue = (
    fieldName: string,
    value: string
  ): { newMeasurement: number | undefined; actionMessage: string } => {
    const newMeasurement = parseInt(value) ? parseInt(value) * 2 : undefined;
    const preMeasurement = getPreMeasurement(fieldName);

    if (newMeasurement === undefined || preMeasurement === undefined) {
      return {
        newMeasurement: undefined,
        actionMessage: "",
      };
    }
    if (isWithinOneError(preMeasurement, newMeasurement)) {
      return {
        newMeasurement: preMeasurement,
        actionMessage: "誤差切捨",
      };
    } else {
      return {
        newMeasurement: newMeasurement,
        actionMessage: "切捨→×2",
      };
    }
  };

  const truncateDoubledValue = (fieldName: string, value: string) => {
    const newMeasurement = parseFloat(value)
      ? Math.floor(parseFloat(value) * 2)
      : undefined;
    const preMeasurement = getPreMeasurement(fieldName);

    if (newMeasurement === undefined || preMeasurement === undefined) {
      return {
        newMeasurement: undefined,
        actionMessage: "",
      };
    }

    if (isWithinOneError(preMeasurement, newMeasurement)) {
      return {
        newMeasurement: preMeasurement,
        actionMessage: "誤差切捨",
      };
    } else {
      return {
        newMeasurement: newMeasurement,
        actionMessage: "×2→切捨",
      };
    }
  };

  const truncateValue = (fieldName: string, value: string) => {
    const newMeasurement = parseInt(value) ? parseInt(value) : undefined;
    const preMeasurement = getPreMeasurement(fieldName);

    if (newMeasurement === undefined || preMeasurement === undefined) {
      return {
        newMeasurement: undefined,
        actionMessage: "",
      };
    }

    if (newMeasurement === preMeasurement) {
      return {
        newMeasurement: preMeasurement,
        actionMessage: "",
      };
    } else if (isWithinOneError(preMeasurement, newMeasurement)) {
      return {
        newMeasurement: preMeasurement,
        actionMessage: "誤差切捨",
      };
    } else {
      return {
        newMeasurement: newMeasurement,
        actionMessage: "",
      };
    }
  };

  const getInputResult = (
    fieldName: keyof TSizePartsParams,
    value: string | number
  ): { newMeasurement: number | undefined; actionMessage: string } => {
    let inputResult;
    if (typeof value === "number") {
      inputResult = { newMeasurement: value, actionMessage: "スキップ" };
    } else {
      switch (fieldName) {
        case "shoulder":
          inputResult = truncateValue(fieldName, value);
          break;
        case "bust":
          inputResult = truncateValue(fieldName, value);
          break;
        case "lengthTop":
          inputResult = truncateValue(fieldName, value);
          break;
        case "roundNeck":
          inputResult = truncateValue(fieldName, value);
          break;
        case "waist":
          inputResult = doubleTruncatedValue(fieldName, value);
          break;
        case "minWaist":
          inputResult = doubleTruncatedValue(fieldName, value);
          break;
        case "maxWaist":
          inputResult = doubleTruncatedValue(fieldName, value);
          break;
        case "hip":
          inputResult = truncateDoubledValue(fieldName, value);
          break;
        case "roundLeg":
          inputResult = truncateDoubledValue(fieldName, value);
          break;
        case "outseam":
          inputResult = truncateValue(fieldName, value);
          break;
        case "sleeveLength":
          inputResult = truncateValue(fieldName, value);
          break;
        case "hemWidth":
          inputResult = truncateValue(fieldName, value);
          break;
        default:
          inputResult = {
            newMeasurement: undefined,
            actionMessage: "",
          };
      }
    }
    return inputResult;
  };

  const formReducer = (formData: TFormData, action: FormAction) => {
    const inputResult = getInputResult(action.field, action.value);

    if (
      measurementData.input.needPartsForSizeCalc.includes(selectedPartId) &&
      inputResult.newMeasurement
    ) {
      fetchSizeCalcIndex({
        item_id: measurementData.itemId,
        cate_small_id: measurementData.input.mCateSmallId,
        waist: inputResult.newMeasurement,
      })
        .then((res: TSizeCalcIndexResponse) => {
          setSize(res.size);
        })
        .catch((error: AxiosError) => {
          alert(
            `自動サイズ計測に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        });
    }

    moveToNextPart();

    switch (action.type) {
      case "SET_VALUE":
        return {
          ...formData,
          newMeasurement: {
            ...formData.newMeasurement,
            [action.field]: inputResult.newMeasurement,
          },
          actionMessage: {
            ...formData.actionMessage,
            [action.field]: inputResult.actionMessage,
          },
        };
      default:
        throw new Error("存在しないactionです");
    }
  };
  const [formData, dispatch] = useReducer(formReducer, initialFormData);

  const isParams = (name: string): name is keyof TSizePartsParams => {
    return name in initialFormData.newMeasurement;
  };

  const handleChangeMeasurement = (measurement: string) => {
    setMeasurement(measurement);
  };

  const handleClickUpdate = () => {
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

  const handleClickEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (
        measurement !== undefined &&
        isParams(
          partKeyName[
            selectedPartId as keyof typeof partKeyName
          ] as keyof TSizePartsParams
        )
      ) {
        dispatch({
          type: "SET_VALUE",
          field: partKeyName[
            selectedPartId as keyof typeof partKeyName
          ] as keyof TSizePartsParams,
          value: measurement,
        });
      }
    }
  };

  const handleClickSkip = () => {
    const preMeasurement = measurementData.input.measurements.find(
      (data) => data.part === selectedPartId
    )?.value;

    if (preMeasurement === undefined) return;

    dispatch({
      type: "SET_VALUE",
      field: partKeyName[
        selectedPartId as keyof typeof partKeyName
      ] as keyof TSizePartsParams,
      value: preMeasurement,
    });
  };

  const handleClickSelect = (id: number) => {
    setMeasurement(undefined);
    setSelectedPartId(id);
  };

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

  const changedParts: string[] = optionDetails
    .filter((data) => {
      return data.preMeasurement !== data.newMeasurement;
    })
    .map((part) => part.partName);

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
        onClickSelect={handleClickSelect}
        onClickUpdate={handleClickUpdate}
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
