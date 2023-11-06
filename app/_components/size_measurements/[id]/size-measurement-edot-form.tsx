"use client";
import React from "react";

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import SizeMeasurementsList from "./size-measurements-list";
import { TOptionDetail } from "./size-measurements-list-item";

type TProps = {
  size: string;
  rank: string;
  optionDetails: TOptionDetail[];
  needPartsForSizeCalc: number[];
  selectedPartId: number;
  isLoading: boolean;
  onChangeMeasurement: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeSize: (e: SelectChangeEvent<string>) => void;
  onChangeRank: (e: SelectChangeEvent<string>) => void;
  onClickEnter: (e: React.KeyboardEvent) => void;
  onClickSelect: (id: number) => void;
  onClickUpdate: () => void;
  onClickSkip: () => void;
};

export default function SizeMeasurementsEditForm({
  size,
  rank,
  optionDetails,
  selectedPartId,
  isLoading,
  onChangeMeasurement,
  onChangeSize,
  onChangeRank,
  onClickEnter,
  onClickSelect,
  onClickUpdate,
  onClickSkip,
}: TProps) {
  const isFormValid =
    size &&
    rank &&
    optionDetails.every(
      (optionDetail) => optionDetail.newMeasurement !== undefined
    );

  const selectedPartName =
    optionDetails.find((option) => option.id === selectedPartId)?.partName ??
    "";

  return (
    <>
      <Box
        paddingTop={5}
        paddingBottom={1}
        display="flex"
        justifyContent="space-around"
        color="secondary.main"
      >
        <Box display="flex">
          <Typography variant="h6" color="secondary.dark">
            {selectedPartName}
          </Typography>
          <Typography variant="h6">の計測</Typography>
        </Box>
        <TextField
          variant="standard"
          onChange={onChangeMeasurement}
          onKeyDown={onClickEnter}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Box
          height={60}
          display="flex"
          alignItems="center"
          borderBottom={0.2}
          width="90%"
        >
          <Typography variant="h6" marginLeft={1} color="primary.main">
            サイズ
          </Typography>
          <Box width={60} marginLeft={3}>
            <FormControl fullWidth>
              <Select
                value={size}
                onChange={onChangeSize}
                variant="standard"
                disableUnderline
                sx={{ "& svg": { color: "warning.dark" } }}
              >
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <SizeMeasurementsList
        optionDetails={optionDetails}
        selectedPartId={selectedPartId}
        onClickSelect={onClickSelect}
      />
      <Box
        height={60}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="h6" marginLeft={4} color="primary.main">
          ランク
        </Typography>
        <Box width={60} marginLeft={3}>
          <FormControl fullWidth>
            <Select
              value={rank}
              onChange={onChangeRank}
              variant="standard"
              disableUnderline
              sx={{ "& svg": { color: "warning.dark" } }}
            >
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-around" padding={2} height={60}>
        <Button variant="outlined" sx={{ width: "45%" }} onClick={onClickSkip}>
          スキップ
        </Button>
        <Button
          variant="contained"
          sx={{ width: "45%" }}
          fullWidth
          disabled={!isFormValid || isLoading}
          onClick={onClickUpdate}
        >
          確定
        </Button>
      </Box>
    </>
  );
}
