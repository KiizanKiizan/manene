"use client";
import { Dialog } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type TProps = {
  open: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  zIndex?: number;
  children: React.ReactNode;
};

export default function DisableBackDialog({
  open,
  onClose,
  fullScreen = false,
  zIndex = 10,
  children,
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
      fullWidth
      fullScreen={fullScreen}
      sx={{
        zIndex: zIndex,
      }}
    >
      <div style={{ overflow: "hidden" }}>{children}</div>
    </Dialog>
  );
}
