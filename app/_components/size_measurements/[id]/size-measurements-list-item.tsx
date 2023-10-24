// ListItem
'use client';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ListItem, Typography } from '@mui/material';
import { LiaHandPointRight } from 'react-icons/lia';

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
    <ListItem sx={{ display: 'flex' }}>
      <LiaHandPointRight
        color={isSelected ? 'warning.main' : undefined}
        onClick={() => onClickSelect(optionDetail.id)}
      />
      <Typography>{optionDetail.partName}</Typography>
      <Typography>{optionDetail.preMeasurement}</Typography>
      <ArrowRightIcon />
      <Typography>{optionDetail.newMeasurement ?? ''}</Typography>
    </ListItem>
  );
}
