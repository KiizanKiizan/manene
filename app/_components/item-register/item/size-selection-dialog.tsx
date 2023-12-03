import { Box, Button, DialogContent, DialogTitle } from "@mui/material";
import DisableBackDialog from "../../common/dialog/disable-back-dialog";
import StockStatusTable from "./stock-status-table";

type TProps = {
  stockingId: string;
  arrivedSmallNum: number;
  arrivedMediumNum: number;
  arrivedLargeNum: number;
  arrivedExtraLargeNum: number;
  registeredSmallNum: number;
  registeredMediumNum: number;
  registeredLargeNum: number;
  registeredExtraLargeNum: number;
  onClickSize: (size: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

function SizeSelectionButton({
  size,
  onClickSize,
}: {
  size: string;
  onClickSize: (size: string) => void;
}) {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ height: "100%", fontSize: "60px" }}
      onClick={() => onClickSize(size)}
    >
      {size}
    </Button>
  );
}

export default function SizeSelectionDialog({
  stockingId,
  arrivedSmallNum,
  arrivedMediumNum,
  arrivedLargeNum,
  arrivedExtraLargeNum,
  registeredSmallNum,
  registeredMediumNum,
  registeredLargeNum,
  registeredExtraLargeNum,
  onClickSize,
  isOpen,
  onClose,
}: TProps) {
  return (
    <DisableBackDialog open={isOpen} onClose={onClose}>
      <DialogTitle>入荷サイズ選択</DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <StockStatusTable
          stockingId={stockingId}
          arrivedSmallNum={arrivedSmallNum}
          arrivedMediumNum={arrivedMediumNum}
          arrivedLargeNum={arrivedLargeNum}
          arrivedExtraLargeNum={arrivedExtraLargeNum}
          registeredSmallNum={registeredSmallNum}
          registeredMediumNum={registeredMediumNum}
          registeredLargeNum={registeredLargeNum}
          registeredExtraLargeNum={registeredExtraLargeNum}
        />
        <Box paddingX={1} marginTop={1}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
            <Box gridColumn="span 6" padding={1} height="14vh">
              <SizeSelectionButton size="S" onClickSize={onClickSize} />
            </Box>
            <Box gridColumn="span 6" padding={1} height="14vh">
              <SizeSelectionButton size="M" onClickSize={onClickSize} />
            </Box>
            <Box gridColumn="span 6" padding={1} height="14vh">
              <SizeSelectionButton size="L" onClickSize={onClickSize} />
            </Box>
            <Box gridColumn="span 6" padding={1} height="14vh">
              <SizeSelectionButton size="XL" onClickSize={onClickSize} />
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </DisableBackDialog>
  );
}
