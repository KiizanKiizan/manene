import ItemSizeDetailCard from "@/app/_components/common/Item/item-size-detail-card";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import ItemInfoListItem from "./item-info-list-item";

export type TItemData = {
  name: string;
  value: string;
};

type TProps = {
  itemData: TItemData[];
  size: string | null;
  partSize: { partName: string; partSize: number }[];
  adminName?: string;
  onClickAdminSection: () => void;
  onClickSizeMeasurement: () => void;
};

export default function ItemInfoList({
  itemData,
  size,
  partSize,
  adminName,
  onClickAdminSection,
  onClickSizeMeasurement,
}: TProps) {
  return (
    <>
      <List>
        {itemData.map((item: TItemData) => (
          <ItemInfoListItem key={item.name} itemData={item} />
        ))}
        <ListItem divider>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            height={40}
            onClick={onClickAdminSection}
          >
            <Typography variant="h6">登録者</Typography>
            <Typography variant="h6">{adminName ?? ""}</Typography>
          </Box>
        </ListItem>
        <ListItem divider>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h6">サイズ</Typography>
            {size !== null && (
              <>
                <ItemSizeDetailCard partSizes={partSize} />
                <Typography variant="h6">{size}</Typography>
              </>
            )}
            <Button
              variant="text"
              onClick={onClickSizeMeasurement}
              sx={{ fontSize: "20px" }}
            >
              計測
            </Button>
          </Box>
        </ListItem>
      </List>
    </>
  );
}
