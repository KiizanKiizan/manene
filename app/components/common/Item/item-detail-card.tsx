"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandableImage from "../Image/expandable-image";

type TProps = {
  itemImageUrl: string;
  partSizes: { partName: string; partSize: number }[];
  wearSize: string;
  itemDetails: { label: string; value: number | string }[];
};

export default function ItemDetailCard({
  itemImageUrl,
  partSizes,
  wearSize,
  itemDetails,
}: TProps) {
  return (
    <Box padding={"7%"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box width={120}>
          <ExpandableImage
            imagePath={itemImageUrl}
            imageStyle={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
        <Box sx={{ border: "1px solid", padding: 0, height: "180px" }}>
          <TableContainer sx={{ padding: 0, height: "100%" }}>
            <Table aria-label="simple table">
              <TableHead
                sx={{
                  bgcolor: "primary.main",
                }}
              >
                <TableRow sx={{ color: "white" }}>
                  {partSizes.slice(0, 3).map((partSize) => {
                    return (
                      <TableCell
                        key={partSize.partName}
                        sx={{
                          color: "white",
                          paddingY: 0,
                          fontSize: "0.7rem",
                        }}
                        align="center"
                      >
                        {partSize.partName}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      paddingY: "5px",
                    },
                  }}
                >
                  {partSizes.slice(0, 3).map((partSize) => {
                    return (
                      <TableCell key={partSize.partName} align="center">
                        {partSize.partSize}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
            <Table aria-label="simple table">
              <TableHead
                sx={{
                  bgcolor: "primary.main",
                }}
              >
                <TableRow>
                  {partSizes.slice(3, 6).map((partSize) => {
                    return (
                      <TableCell
                        key={partSize.partName}
                        sx={{
                          color: "white",
                          paddingY: 0,
                          fontSize: "0.7rem",
                        }}
                        align="center"
                      >
                        {partSize.partName}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      paddingY: "5px",
                    },
                  }}
                >
                  {partSizes.slice(3, 6).map((partSize) => {
                    return (
                      <TableCell key={partSize.partName} align="center">
                        {partSize.partSize}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
            <Table aria-label="simple table" sx={{ height: "100%" }}>
              <TableHead
                sx={{
                  bgcolor: "primary.main",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{ color: "white", paddingY: 0, fontSize: "0.7rem" }}
                    align="center"
                  >
                    サイズ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      paddingY: "5px",
                    },
                  }}
                >
                  <TableCell align="center">{wearSize}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box sx={{ border: "1px solid" }}>
        <TableContainer sx={{ padding: 0 }}>
          {itemDetails.map((row) => {
            return (
              <Table key={row.label} aria-label="simple table">
                <TableHead
                  sx={{
                    bgcolor: "primary.main",
                  }}
                >
                  <TableRow>
                    <TableCell
                      sx={{ color: "white", paddingY: 0 }}
                      align="center"
                    >
                      {row.label}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ display: "flex", height: "100%" }}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.value}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          })}
        </TableContainer>
      </Box>
    </Box>
  );
}
