import getStocktakingsLocationsShow from "@/app/api/stocktaking-location/getStocktakingLocationsShow";
import StocktakingLocationContainer from "@/app/components/stocktaking-location/stocktaking-location-container";

type TParams = {
  params: { id: number };
};
export default async function StocktakingLocationPage({ params }: TParams) {
  const data = await getStocktakingsLocationsShow({ id: params.id });
  console.log(data);
  console.log("-------------------------------------------------");
  return <StocktakingLocationContainer location={data} />;
}
