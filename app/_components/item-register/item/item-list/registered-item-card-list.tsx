import { List } from "@mui/material";
import RegisteredItemCard from "./registered-item-card";

export type TCardInfo = {
  cardId: number;
  itemImage: string;
  adminName: string;
  registeredContentMessage: string;
  registeredSizeMessage: string;
  isRegistered: boolean;
};

type TProps = {
  cardInfo: TCardInfo[];
  onClick: (cardId: number) => void;
  onLongPress: (cardId: number) => void;
};

export default function RegisteredItemCardList({
  cardInfo,
  onClick,
  onLongPress,
}: TProps) {
  return (
    <List>
      {cardInfo.map((card) => {
        return (
          <RegisteredItemCard
            key={card.cardId}
            cardId={card.cardId}
            itemImage={card.itemImage}
            adminName={card.adminName}
            registeredContentMessage={card.registeredContentMessage}
            registeredSizeMessage={card.registeredSizeMessage}
            isRegistered={card.isRegistered}
            onClick={onClick}
            onLongPress={onLongPress}
          />
        );
      })}
    </List>
  );
}
