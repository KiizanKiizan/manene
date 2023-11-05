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
    <ListItem sx={{ display: "flex", width: "100%", height: "4rem" }} divider>
      <Box display="flex" justifyContent="center">
        <LiaHandPointRight
          size={27}
          color={isSelected ? "red" : rightGray}
          onClick={() => onClickSelect(optionDetail.id)}
        />
      </Box>
      <Typography
        variant="subtitle1"
        color="primary.main"
        textAlign="center"
        width={500}
      >
        {optionDetail.partName}
      </Typography>
      <Typography variant="subtitle1" color="secondary.dark">
        {optionDetail.preMeasurement}cm
      </Typography>
      <Box marginLeft={1} width={3}>
        <ArrowRightIcon />
      </Box>
      <Box display="flex" alignItems="center" marginLeft={3} width="100%">
        <Box width={100}>
          <Typography variant="body2" color="primary.main">
            {optionDetail.actionMessage}
          </Typography>
          <Box display="flex">
            <Typography
              variant="subtitle1"
              color="secondary.dark"
              textAlign="right"
              width={30}
            >
              {optionDetail.newMeasurement ?? ""}
            </Typography>
            <Typography variant="subtitle1" color="secondary.dark" width={30}>
              cm
            </Typography>
          </Box>
        </Box>
        <Box width={30}>
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
