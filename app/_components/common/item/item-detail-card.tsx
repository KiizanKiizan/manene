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
import ItemSizeDetailCard, { TPartSize } from "../item/item-size-detail-card";

type TProps = {
  itemImageUrl: string;
  partSizes: TPartSize[];
  wearSize: string;
  itemDetails: { label: string; value: number | string }[];
  changedParts?: string[];
  isSizeChanged?: boolean;
  isRankChanged?: boolean;
};

export default function ItemDetailCard({
  itemImageUrl,
  partSizes,
  wearSize,
  itemDetails,
  changedParts,
  isSizeChanged,
  isRankChanged,
}: TProps) {
  return (
    <Box padding={"7%"} data-testid="item-detail-card" height="100%">
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
        <ItemSizeDetailCard
          partSizes={partSizes}
          wearSize={wearSize}
          changedParts={changedParts}
          isSizeChanged={isSizeChanged}
        />
      </Box>
      <Box
        sx={{
          border: "1px solid",
        }}
        maxHeight="55vh"
        marginTop={2}
        overflow="auto"
      >
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
                    <TableCell align="center">
                      {row.label === "ランク・使用回数" && isRankChanged ? (
                        <Box color="warning.dark">{row.value}</Box>
                      ) : (
                        row.value
                      )}
                    </TableCell>
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
