import { Box, ListItem, Typography } from "@mui/material";

type TProps = {
  itemData: {
    name: string;
    value: string;
  };
};
export default function ItemInfoListItem({ itemData }: TProps) {
  return (
    <ListItem divider>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height={40}
      >
        <Typography variant="h6">{itemData.name}</Typography>
        <Typography variant="h6">{itemData.value}</Typography>
      </Box>
    </ListItem>
  );
}
