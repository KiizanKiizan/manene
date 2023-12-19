import getSizeMeasurementIndex from "@/app/_api/size_measurement/getSizeMeasurementIndex";
import SizeMeasurementEditContainer from "@/app/_components/size_measurements/[id]/size-measurement-edit-container";

type TProps = {
  params: {
    id: number;
  };
};

export default async function SizeMeasurementsPage({ params }: TProps) {
  const data = await getSizeMeasurementIndex({ itemId: params.id });
  return <SizeMeasurementEditContainer measurementData={data} />;
}
