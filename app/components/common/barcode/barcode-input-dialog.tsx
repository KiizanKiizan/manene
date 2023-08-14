"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

type TProps = {
  onClickSetId: (id: number) => void;
  onClose: () => void;
  isOpen: boolean;
};

export default function BarcodeInputDialog({
  onClickSetId,
  onClose,
  isOpen,
}: TProps) {
  const [id, setId] = useState<number>();

  const handleChangeChartId = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setId(
      isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value)
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>バーコードのIDを入力</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          type="number"
          variant="standard"
          fullWidth
          onChange={handleChangeChartId}
          value={id ?? ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button
          onClick={() => {
            if (id === undefined)
              throw new Error(
                "idがundefinedの状態でonclickが発火しようとされています。"
              );
            onClickSetId(id);
            setId(undefined);
          }}
          disabled={id === undefined}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
