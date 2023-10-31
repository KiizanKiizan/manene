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
  selectedPartdId: number;
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
  selectedPartdId,
  isLoading,
  onChangeMeasurement,
  onChangeSize,
  onChangeRank,
  onClickEnter,
  onClickSelect,
  onClickUpdate,
  onClickSkip,
}: TProps) {
  const isFormValid = () => {
    return (
      size &&
      rank &&
      optionDetails.every(
        (optionDetail) => optionDetail.newMeasurement !== undefined
      )
    );
  };

  const selectedPartName =
    optionDetails.find((option) => option.id === selectedPartdId)?.partName ??
    "";
  return (
    <>
      <Box sx={{ p: "1.2rem", display: "grid", gap: 1 }}>
        <Box
          color="secondary.main"
          sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            style={{ fontWeight: "300" }}>
            <span style={{ fontWeight: "500" }}>{selectedPartName}</span>
            の測定
          </Typography>

          <TextField
            id="standard-basic"
            variant="standard"
            onChange={onChangeMeasurement}
            onKeyDown={(e: React.KeyboardEvent) => onClickEnter(e)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            borderBottom: "1px solid #bdbdbd",
            alignItems: "center",
          }}>
          <Typography
            variant="h6"
            color="primary.main"
            sx={{ mr: "1.5rem", fontWeight: "500" }}>
            サイズ
          </Typography>
          <FormControl
            variant="filled"
            sx={{
              m: 1,
              minWidth: 120,
              bgcolor: "white",
              "& .MuiFilledInput-underline:before": {
                display: "none",
              },
              "& .MuiFilledInput-underline:after": {
                display: "none",
              },
              "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                display: "none",
              },
              "& .MuiFilledInput-root": {
                backgroundColor: "white",
              },
            }}>
            <Select
              value={size}
              onChange={onChangeSize}
              sx={{
                "&:focus": {
                  backgroundColor: "white",
                },
                color: "red",
                "& .MuiSelect-icon": {
                  color: "red",
                },
              }}>
              <MenuItem
                value="S"
                color="secondary.main">
                S
              </MenuItem>
              <MenuItem
                value="M"
                color="secondary.main">
                M
              </MenuItem>
              <MenuItem
                value="L"
                color="secondary.main">
                L
              </MenuItem>
              <MenuItem
                value="XL"
                color="secondary.main">
                XL
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <SizeMeasurementsList
          optionDetails={optionDetails}
          selectedPartId={selectedPartdId}
          onClickSelect={onClickSelect}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <Typography
            variant="h6"
            color="primary.main"
            sx={{ mr: "1.5rem", fontWeight: "500" }}>
            ランク
          </Typography>
          <FormControl
            variant="filled"
            sx={{
              m: 1,
              minWidth: 120,
              bgcolor: "white",
              "& .MuiFilledInput-underline:before": {
                display: "none",
              },
              "& .MuiFilledInput-underline:after": {
                display: "none",
              },
              "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                display: "none",
              },
              "& .MuiFilledInput-root": {
                backgroundColor: "white",
              },
            }}>
            <Select
              value={rank}
              onChange={onChangeRank}
              sx={{
                "&:focus": {
                  backgroundColor: "white",
                },
                color: "red",
                "& .MuiSelect-icon": {
                  color: "red",
                },
              }}>
              <MenuItem
                value="S"
                sx={{
                  "&.Mui-selected": { backgroundColor: "white" },
                  backgroundColor: "white",
                }}>
                S
              </MenuItem>
              <MenuItem
                value="A"
                sx={{
                  "&.Mui-selected": { backgroundColor: "white" },
                  backgroundColor: "white",
                }}>
                A
              </MenuItem>
              <MenuItem
                value="B"
                sx={{
                  "&.Mui-selected": { backgroundColor: "white" },
                  backgroundColor: "white",
                }}>
                B
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={onClickSkip}
            variant="contained"
            size="large"
            sx={{
              width: "10rem",
              padding: "13px 27px",
              fontSize: "1.3rem",
              marginRight: "1rem",
              backgroundColor: "white",
              color: "#bdbdbd",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                color: "808080",
              },
              "&:active": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}>
            スキップ
          </Button>
          <Button
            onClick={onClickUpdate}
            disabled={!isFormValid() || isLoading}
            variant="contained"
            size="large"
            sx={{
              width: "10rem",
              padding: "13px 27px",
              fontSize: "1.3rem",
              backgroundColor: "white",
              color: "#bdbdbd",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                color: "808080",
              },
              "&:active": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}>
            確定
          </Button>
        </Box>
      </Box>
    </>
  );
}
