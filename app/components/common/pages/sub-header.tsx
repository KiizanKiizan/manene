import { Box, Typography } from "@mui/material";
import React from "react";
type TProps = {
  children: React.ReactNode;
};

export default function SubHeader({ children }: TProps) {
  return (
    <Box
      data-testId="sub-header"
      sx={{
        bgcolor: "#CCCCCC",
        height: "30px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography ml={2}>{children}</Typography>
    </Box>
  );
}
