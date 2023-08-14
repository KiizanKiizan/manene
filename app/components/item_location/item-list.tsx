import { TItemLocationsItemScanResponse as itemInfo } from "@/app/api/item-location/useItemLocationsItemScan";
import ItemMiniCard from "../common/Item/item-mini-card";
import { Box } from "@mui/material";

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
