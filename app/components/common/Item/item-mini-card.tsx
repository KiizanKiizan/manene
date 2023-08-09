import { TItemLocationsItemScanResponse as itemInfo } from "@/app/api/item-location/useItemLocationsItemScan";
import { Box, Card, CardContent, Typography, styled } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type TProps = {
  Item: itemInfo;
};

export default function ItemMiniCard({ Item }: TProps) {
  const [isOpenItemDetailFetcher, setIsOpenItemDetailFetcher] = useState(false);

  const SCardContent = styled(CardContent)`
    &:last-child {
      padding-bottom: 0;
    }
  `;

  return (
    <>
      <Card
        onClick={() => {
          setIsOpenItemDetailFetcher(true);
        }}
        sx={{
          borderRadius: 0,
          boxShadow: 0,
        }}
      >
        <SCardContent>
          <Image
            alt="Item画像"
            src={Item.itemImageUrl}
            width={60}
            height={100}
          ></Image>
          <Box>
            <Typography fontSize={10}>{Item.id}</Typography>
            <Typography fontSize={10}>サイズ:{Item.size}</Typography>
            <Typography fontSize={10}>小カテ:{Item.mCateSmall.name}</Typography>
            <Typography fontSize={10}>棚:{Item.mLocation.name}</Typography>
          </Box>
        </SCardContent>
      </Card>

      {isOpenItemDetailFetcher && (
        <ItemDetailFetcher
          ItemId={Item.id}
          onClose={() => {
            setIsOpenItemDetailFetcher(false);
          }}
        />
      )}
    </>
  );
}
