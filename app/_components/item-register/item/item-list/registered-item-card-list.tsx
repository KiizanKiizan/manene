import { List } from "@mui/material";
import RegisteredItemCard from "./registered-item-card";

export type TCardInfo = {
  cardId: number;
  itemImage: string;
  adminName: string;
  registeredContent: string;
  registeredSize: string;
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
            registeredContent={card.registeredContent}
            registeredSize={card.registeredSize}
            isRegistered={card.isRegistered}
            onClick={onClick}
            onLongPress={onLongPress}
          />
        );
      })}
    </List>
  );
}
