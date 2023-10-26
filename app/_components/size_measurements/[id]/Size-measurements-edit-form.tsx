'use client';

import {
  Box,
  Button,
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
  isLoading: boolean;
  onChangeMeasurement: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeSize: (e: SelectChangeEvent<string>) => void;
  onChangeRank: (e: SelectChangeEvent<string>) => void;
  onClickEnter: (e: KeyboardEvent) => void;
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
  return (
    <>
      <Box sx={{ p: '1.2rem' }}>
        <Box
          color="secondary.main"
          sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            style={{ fontWeight: '300' }}>
            <span style={{ fontWeight: '500' }}>ウエスト</span>
            の測定
          </Typography>

          <TextField
            id="standard-basic"
            variant="standard"
            onChange={onChangeMeasurement}
            onKeyDown={(e) => onClickEnter}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            borderBottom: 1,
          }}>
          <Typography
            variant="h6"
            color="secondary.main"
            sx={{ mr: '1.5rem' }}>
            サイズ
          </Typography>
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
        <Box>
          <Button onClick={onClickSkip}>スッキプ</Button>
          <Button
            onClick={onClickUpdate}
            disabled={isLoading}>
            確定
          </Button>
        </Box>
      </Box>
    </>
  );
}

//全てが入力されていないと確定ボタンを押せないようにする。
//ウエストの箇所を動的にする
