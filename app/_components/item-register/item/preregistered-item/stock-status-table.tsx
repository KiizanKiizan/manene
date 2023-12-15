import { Box, Typography } from "@mui/material";

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
};

function GridBoxItem({ content }: { content?: string | number }) {
  return (
    <Box gridColumn="span 3" display="flex" justifyContent="center">
      {content}
    </Box>
  );
}

export default function StockStatusTable({
  stockingId,
  arrivedSmallNum,
  arrivedMediumNum,
  arrivedLargeNum,
  arrivedExtraLargeNum,
  registeredSmallNum,
  registeredMediumNum,
  registeredLargeNum,
  registeredExtraLargeNum,
}: TProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      color="secondary.dark"
    >
      <Typography>登録コード：{stockingId}</Typography>
      <Box border={1} width="90%">
        <Box padding={1}>
          <Box display="grid" gridTemplateColumns="repeat(15, 1fr)">
            <GridBoxItem />
            <GridBoxItem content="S" />
            <GridBoxItem content="M" />
            <GridBoxItem content="L" />
            <GridBoxItem content="XL" />
          </Box>
          <Box display="grid" gridTemplateColumns="repeat(15, 1fr)">
            <GridBoxItem content="入荷数" />
            <GridBoxItem content={arrivedSmallNum} />
            <GridBoxItem content={arrivedMediumNum} />
            <GridBoxItem content={arrivedLargeNum} />
            <GridBoxItem content={arrivedExtraLargeNum} />
            <GridBoxItem content="登録数" />
            <GridBoxItem content={registeredSmallNum} />
            <GridBoxItem content={registeredMediumNum} />
            <GridBoxItem content={registeredLargeNum} />
            <GridBoxItem content={registeredExtraLargeNum} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
