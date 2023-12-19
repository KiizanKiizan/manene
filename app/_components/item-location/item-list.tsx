import { TItemLocationsItemScanResponse as itemInfo } from "@/app/_api/item-location/useItemLocationsItemScan";
import { Box } from "@mui/material";
import ItemMiniCard from "../common/item/item-mini-card";

type TProps = {
  selectedItems: itemInfo[];
};

export default function ItemList({ selectedItems }: TProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 100px)",
      }}
    >
      {selectedItems.map((selectedItem) => (
        <ItemMiniCard Item={selectedItem} key={selectedItem.id} />
      ))}
    </Box>
  );
}
