"use client";
import { Box } from "@mui/material";
import React from "react";
import ExpandableImage from "../Image/expandable-image";

type TProps = {
  imagePath: string;
  children: React.ReactNode;
};

export default function ItemCard({ imagePath, children }: TProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: 1,
        p: 0.5,
        bgcolor: "background.paper",
      }}
    >
      <ExpandableImage imagePath={imagePath} />
      <Box sx={{ ml: 1.5 }}>{children}</Box>
    </Box>
  );
}
