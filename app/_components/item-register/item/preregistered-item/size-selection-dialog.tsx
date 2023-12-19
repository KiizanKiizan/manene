import { Box, Button, DialogContent, DialogTitle } from "@mui/material";
import DisableBackDialog from "../../../common/dialog/disable-back-dialog";
import { TSize } from "../../item-register-container";
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
  onClickSize: (size: TSize) => void;
  onClose: () => void;
};

function SizeSelectionButton({
  size,
  isDisabled,
  onClickSize,
}: {
  size: TSize;
  isDisabled: boolean;
  onClickSize: (size: TSize) => void;
}) {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ height: "100%", fontSize: "60px" }}
      onClick={() => onClickSize(size)}
      disabled={isDisabled}
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
  onClose,
}: TProps) {
  return (
    <DisableBackDialog open onClose={onClose}>
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
              <SizeSelectionButton
                size="S"
                onClickSize={onClickSize}
                isDisabled={!(arrivedSmallNum - registeredSmallNum > 0)}
              />
            </Box>
            <Box gridColumn="span 6" padding={1} height="14vh">
              <SizeSelectionButton
                size="M"
                onClickSize={onClickSize}
                isDisabled={!(arrivedMediumNum - registeredMediumNum > 0)}
              />
            </Box>
            <Box gridColumn="span 6" padding={1} height="14vh">
              <SizeSelectionButton
                size="L"
                onClickSize={onClickSize}
                isDisabled={!(arrivedLargeNum - registeredLargeNum > 0)}
              />
            </Box>
            <Box gridColumn="span 6" padding={1} height="14vh">
              <SizeSelectionButton
                size="XL"
                onClickSize={onClickSize}
                isDisabled={
                  !(arrivedExtraLargeNum - registeredExtraLargeNum > 0)
                }
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </DisableBackDialog>
  );
}
