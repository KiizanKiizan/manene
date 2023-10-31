"use client";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box, ListItem, Typography } from "@mui/material";
import { LiaHandPointRight } from "react-icons/lia";

export type TOptionDetail = {
  id: number;
  partName: string;
  preMeasurement: number;
  newMeasurement?: number;
  actionMessage: string;
};

type TProps = {
  optionDetail: TOptionDetail;
  isSelected: boolean;
  onClickSelect: (id: number) => void;
};

export default function SizeMeasurementsListItem({
  optionDetail,
  isSelected,
  onClickSelect,
}: TProps) {
  return (
    <ListItem
      divider
      sx={{
        display: "flex",
        width: "100%",
        height: "6rem",
        justifyContent: "space-around",
      }}>
      <LiaHandPointRight
        size={27}
        color={isSelected ? "red" : undefined}
        onClick={() => onClickSelect(optionDetail.id)}
      />
      <Typography
        color="primary.main"
        style={{
          fontSize: "1.2rem",
          fontWeight: "500",
        }}>
        {optionDetail.partName}
      </Typography>
      <Typography
        color="secondary.main"
        style={{ fontSize: "1.2rem" }}>
        {optionDetail.preMeasurement}cm
      </Typography>
      <ArrowRightIcon htmlColor="secondary.main" />
      <Box>
        <Typography
          style={{
            fontSize: "0.8rem",
            fontWeight: "300",
          }}
          color="primary.main">
          {optionDetail.actionMessage}
        </Typography>
        <Typography
          color="secondary.main"
          style={{ fontSize: "1.2rem" }}>
          {optionDetail.newMeasurement ?? ""}cm
        </Typography>
      </Box>
    </ListItem>
  );
}
