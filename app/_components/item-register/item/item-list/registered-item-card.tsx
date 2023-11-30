"use client";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "long-press-event";

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { TCardInfo } from "./registered-item-card-list";

type TProps = TCardInfo & {
  onClick: (cardId: number) => void;
  onLongPress: (cardId: number) => void;
};

export default function RegisteredItemCard({
  cardId,
  itemImage,
  adminName,
  registeredContent,
  registeredSize,
  isRegistered,
  onClick,
  onLongPress,
}: TProps) {
  useEffect(() => {
    // 長押しイベント
    const cardActionArea = document.getElementById(
      `card-action-area-${cardId}`
    );
    if (cardActionArea) {
      cardActionArea.addEventListener("long-press", () => {
        onLongPress(cardId);
      });
    }
  }, [cardId, onLongPress]);
  return (
    <Card
      sx={{
        height: 230,
        display: "flex",
        alignItems: "center",
        borderBottom: "solid",
        borderWidth: 1,
      }}
    >
      <CardActionArea
        onClick={() => onClick(cardId)}
        id={`card-action-area-${cardId}`}
      >
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
          <Box
            gridColumn="span 4"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            paddingLeft={3}
          >
            {isRegistered && <CheckCircleOutlineIcon color="primary" />}
            <CardMedia
              sx={{ height: 130, width: 90, marginY: 2 }}
              image={itemImage}
              title="item_image"
            />
            <Typography color="primary">{cardId}</Typography>
          </Box>
          <Box gridColumn="span 7">
            <Box>
              <Typography color="primary">登録内容</Typography>
              <Typography marginLeft={2}>{registeredContent}</Typography>
            </Box>
            <Box>
              <Typography color="primary">サイズ</Typography>
              <Typography marginLeft={2}>{registeredSize}</Typography>
            </Box>
            <Box>
              <Typography color="primary">登録者</Typography>
              <Typography marginLeft={2}>{adminName}</Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
