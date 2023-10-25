'use client';

import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';
import SizeMeasurementsList from './size-measurements-list';
import { TOptionDetail } from './size-measurements-list-item';

type TProps = {
  size: string;
  rank: string;
  optionDetails: TOptionDetail[];
  needPartsForSizeCalc: number[];
  selectedPartdId: number;
  onChangeMeasurement: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeSize: (e: SelectChangeEvent<string>) => void;
  onChangeRank: (e: SelectChangeEvent<string>) => void;
  onClickEnter: (e: KeyboardEvent) => void;
  onClickSelect: (id: number) => void;
};

export default function SizeMeasurementsEditForm({
  size,
  rank,
  optionDetails,
  selectedPartdId,
  onChangeMeasurement,
  onChangeSize,
  onChangeRank,
  onClickEnter,
  onClickSelect,
}: TProps) {
  return (
    <>
      <Box>
        <Typography style={{ fontSize: '1.2rem' }}>ウエストの測定</Typography>

        <TextField
          id="standard-basic"
          variant="standard"
          onChange={onChangeMeasurement}
          onKeyDown={(e) => onClickEnter}
        />
      </Box>
      <Box>
        <Typography>サイズ</Typography>
        <Select
          value={size}
          onChange={onChangeSize}>
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="L">L</MenuItem>
          <MenuItem value="XL">XL</MenuItem>
        </Select>
      </Box>
      <SizeMeasurementsList
        optionDetails={optionDetails}
        selectedPartId={selectedPartdId}
        onClickSelect={onClickSelect}
      />
      <Box>
        <Typography>ランク</Typography>
        <Select
          value={rank}
          onChange={onChangeRank}>
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </Select>
      </Box>
    </>
  );
}
