import ItemDetailCardContainer from "@/app/_components/common/item/item-detail-card-container";
import getItemsShow from "../../_api/item_detail/getItemsShow";

type TProps = {
  params: {
    id: number;
  };
};

export default async function ItemDetailPage({ params }: TProps) {
  const data = await getItemsShow(params);
  return <ItemDetailCardContainer itemInfo={data} />;
}
