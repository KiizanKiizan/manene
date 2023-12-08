"use client";
import { Dialog, DialogProps } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type TProps = {
  open: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  fullWidth?: boolean;
  zIndex?: number;
  children: React.ReactNode;
  PaperProps?: DialogProps["PaperProps"];
};

export default function DisableBackDialog({
  open,
  onClose,
  fullScreen = false,
  fullWidth = true,
  zIndex = 10,
  children,
  PaperProps,
}: TProps) {
  const pathname = usePathname();
  useEffect(() => {
    if (open) {
      history.pushState("", "", pathname);
      addEventListener("popstate", onClose);
      return () => {
        removeEventListener("popstate", onClose);
      };
    }
  }, [open, onClose, pathname]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={PaperProps}
      fullWidth={fullWidth}
      sx={{
        zIndex: zIndex,
        maxHeight: "100vh",
      }}
    >
      <div style={{ overflow: "auto" }}>{children}</div>
    </Dialog>
  );
}
