// ListItem
'use client';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, ListItem, Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();
  return (
    <ListItem
      divider
      sx={{
        display: 'flex',
        width: '100%',
        height: '6rem',
        justifyContent: 'space-around',
      }}>
      <LiaHandPointRight
        size={27}
        color={isSelected ? 'red' : undefined}
        onClick={() => onClickSelect(optionDetail.id)}
      />
      <Typography
        style={{
          color: theme.palette.primary.main,
          fontSize: '1.2rem',
          fontWeight: '500',
        }}>
        {optionDetail.partName}
      </Typography>
      <Typography
        style={{ fontSize: '1.2rem', color: theme.palette.secondary.main }}>
        {optionDetail.preMeasurement}cm
      </Typography>
      <ArrowRightIcon style={{ color: theme.palette.secondary.main }} />
      <Box>
        <Typography
          style={{
            color: theme.palette.primary.main,
            fontSize: '0.8rem',
            fontWeight: '300',
          }}>
          {optionDetail.actionMessage}
        </Typography>
        <Typography
          style={{ fontSize: '1.2rem', color: theme.palette.secondary.main }}>
          {optionDetail.newMeasurement ?? ''}cm
        </Typography>
      </Box>
    </ListItem>
  );
}
