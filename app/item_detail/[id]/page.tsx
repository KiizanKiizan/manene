import ItemDetailCardContainer from "@/app/components/common/Item/item-detail-card-container";
import getItemsShow from "../../api/item_detail/getItemsShow";

type TProps = {
  params: {
    id: number;
  };
};

export default async function ItemDetailPage({ params }: TProps) {
  const data = await getItemsShow(params);
  return <ItemDetailCardContainer itemInfo={data} />;
}
