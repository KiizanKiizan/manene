import { TChartItem } from "@/app/_api/before-inspections/useBeforeInspectionsCreate";
import { List } from "@mui/material";
import ItemCard from "../common/item/item-card";
import ItemInfoCard from "../common/item/item-info-card";

type TProps = {
  chartItems: TChartItem[];
  onClick: (id: number) => void;
  isLoading: boolean;
};

export default function BeforeInspectionList({
  chartItems,
  onClick,
  isLoading,
}: TProps) {
  return (
    <List>
      {chartItems.map((chartItem: TChartItem) => {
        return (
          <ItemCard
            key={chartItem.id}
            imagePath={chartItem.itemInfo.itemImageUrl}
          >
            <ItemInfoCard
              itemInfo={chartItem.itemInfo}
              chartItemId={chartItem.id}
              onClick={onClick}
              isLoading={isLoading}
              isPurchased={chartItem.purchasedFlag}
              inspectionStatus={chartItem.inspectionStatus}
            />
          </ItemCard>
        );
      })}
    </List>
  );
}
