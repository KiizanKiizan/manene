import { TMeasurement } from "@/app/_api/items/itemsShowResponse";
import fetchSizeCalcIndex, {
  TSizeCalcIndexResponse,
} from "@/app/_api/size_measurement/fetchSizeCalcIndex";
import { TMeasurementInput } from "@/app/_api/size_measurement/getSizeMeasurementIndex";
import { TSizePartsParams } from "@/app/_api/size_measurement/useSizeMeasurementUpdate";
import { TSize } from "@/app/_components/item-register/item-register-container";
import { SelectChangeEvent } from "@mui/material";
import { AxiosError } from "axios";
import React, { useReducer, useState } from "react";

type FormAction = {
  type: "SET_VALUE";
  field: keyof TSizePartsParams;
  value: string | number;
};

type TFormData = TSizePartsParams & {
  newMeasurement: Record<keyof TSizePartsParams, number | undefined>;
  actionMessage: Record<keyof TSizePartsParams, string | undefined>;
};

type TArgs = {
  measurementInputData: TMeasurementInput;
  itemId?: number;
  arrivalSize?: string;
  copiedItemMeasurementData?: TMeasurement;
};

export const partName = {
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

export const partKeyName = {
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

export default function useSizeMeasurementHandler({
  measurementInputData,
  itemId,
  arrivalSize,
  copiedItemMeasurementData,
}: TArgs) {
  const [size, setSize] = useState<TSize>(
    measurementInputData.size ?? (arrivalSize as TSize)
  );
  const [rank, setRank] = useState<string>(measurementInputData.rank);
  const [measurement, setMeasurement] = useState<string>();
  const [selectedPartId, setSelectedPartId] = useState<number>(
    measurementInputData.measurements[0].part
  );

  const initialFormData: TFormData = {
    newMeasurement: {
      shoulder: undefined,
      bust: undefined,
      lengthTop: undefined,
      roundNeck: undefined,
      waist: undefined,
      minWaist: undefined,
      maxWaist: undefined,
      hip: undefined,
      roundLeg: undefined,
      outseam: undefined,
      sleeveLength: undefined,
      hemWidth: undefined,
    },
    actionMessage: {
      shoulder: undefined,
      bust: undefined,
      lengthTop: undefined,
      roundNeck: undefined,
      waist: undefined,
      minWaist: undefined,
      maxWaist: undefined,
      hip: undefined,
      roundLeg: undefined,
      outseam: undefined,
      sleeveLength: undefined,
      hemWidth: undefined,
    },
  };

  const moveToNextPart = () => {
    const index = measurementInputData.measurements.findIndex(
      (data) => data.part === selectedPartId
    );
    const nextIndex =
      index === measurementInputData.measurements.length - 1 ? 0 : index + 1;
    setMeasurement(undefined);
    setSelectedPartId(measurementInputData.measurements[nextIndex].part);
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

  const getPreMeasurement = (fieldName: string): number | undefined | null => {
    return measurementInputData.measurements.find(
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
    if (
      preMeasurement !== null &&
      isWithinOneError(preMeasurement, newMeasurement)
    ) {
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

    if (
      preMeasurement !== null &&
      isWithinOneError(preMeasurement, newMeasurement)
    ) {
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
    } else if (
      preMeasurement !== null &&
      isWithinOneError(preMeasurement, newMeasurement)
    ) {
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
      measurementInputData.needPartsForSizeCalc.includes(selectedPartId) &&
      inputResult.newMeasurement &&
      itemId
    ) {
      fetchSizeCalcIndex({
        item_id: itemId,
        cate_small_id: measurementInputData.mCateSmallId,
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

  const handleChangeRank = (e: SelectChangeEvent<string>) => {
    setRank(e.target.value);
  };

  const handleChangeSize = (e: SelectChangeEvent<string>) => {
    setSize(e.target.value as TSize);
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
    const preMeasurement =
      measurementInputData.measurements.find(
        (data) => data.part === selectedPartId
      )?.value ??
      copiedItemMeasurementData?.[
        partKeyName[
          selectedPartId as keyof typeof partKeyName
        ] as keyof TSizePartsParams
      ];

    if (preMeasurement === undefined || preMeasurement === null) return;

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

  const optionDetails = measurementInputData.measurements.map((data) => {
    const partKey = partKeyName[data.part as keyof typeof partKeyName];
    return {
      id: data.part,
      partName: partName[data.part as keyof typeof partName],
      preMeasurement:
        data.value ??
        copiedItemMeasurementData?.[partKey as keyof TSizePartsParams] ??
        null,
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

  return {
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
  };
}
