import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export type TPartSize = {
  partName: string;
  partSize: number;
};

type TProps = {
  partSizes: TPartSize[];
  wearSize?: string;
  changedParts?: string[];
  isSizeChanged?: boolean;
};

export default function ItemSizeDetailCard({
  partSizes,
  wearSize,
  changedParts,
  isSizeChanged,
}: TProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        padding: 0,
      }}
    >
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
                    {changedParts?.includes(partSize.partName) ? (
                      <Box color="warning.dark">{partSize.partSize}</Box>
                    ) : (
                      partSize.partSize
                    )}
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
                    {changedParts?.includes(partSize.partName) ? (
                      <Box color="warning.dark">{partSize.partSize}</Box>
                    ) : (
                      partSize.partSize
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
        {wearSize && (
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
                <TableCell align="center">
                  {isSizeChanged ? (
                    <Box color="warning.dark">{wearSize}</Box>
                  ) : (
                    wearSize
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}
