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
  const rightGray = "#EBEBEB";
  return (
    <ListItem
      divider
      sx={{
        display: "flex",
        width: "100%",
        height: "3rem",
      }}
    >
      <Box>
        <LiaHandPointRight
          size={27}
          color={isSelected ? "red" : rightGray}
          onClick={() => onClickSelect(optionDetail.id)}
        />
      </Box>
      <Typography color="primary.main" variant="h6" marginLeft={3}>
        {optionDetail.partName}
      </Typography>
      <Typography color="secondary.dark" variant="subtitle1" marginLeft={3}>
        {optionDetail.preMeasurement}cm
      </Typography>
      <Box marginLeft={3}>
        <ArrowRightIcon />
      </Box>
      <Box display="flex" alignItems="center" marginLeft={3} width="100%">
        <Box width="70%">
          <Typography variant="body2" color="primary.main">
            {optionDetail.actionMessage}
          </Typography>
          <Box display="flex" color="secondary.dark">
            <Typography variant="subtitle1" sx={{ width: "40%" }}>
              {optionDetail.newMeasurement ?? ""}
            </Typography>
            <Typography variant="subtitle1">cm</Typography>
          </Box>
        </Box>
        <Box width="30%">
          {optionDetail.newMeasurement && (
            <Typography variant="subtitle1">
              {optionDetail.newMeasurement - optionDetail.preMeasurement}
            </Typography>
          )}
        </Box>
      </Box>
    </ListItem>
  );
}
