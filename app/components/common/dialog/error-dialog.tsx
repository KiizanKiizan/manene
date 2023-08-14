"use client";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

type TProps = {
  message: string;
};

export default function ErrorDialog({ message }: TProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>エラー</DialogTitle>
      <DialogContent>{message}</DialogContent>
    </Dialog>
  );
}
