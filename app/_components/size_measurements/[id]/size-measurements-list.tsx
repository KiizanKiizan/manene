import SizeMeasurementsListItem, {
  TOptionDetail,
} from './size-measurements-list-item';

type TProps = {
  optionDetails: TOptionDetail[];
  selectedPartId: number;
  onClickSelect: (id: number) => void;
};

export default function SizeMeasurementsList({
  optionDetails,
  selectedPartId,
  onClickSelect,
}: TProps) {
  return (
    <>
      {optionDetails.map((optionDetail: TOptionDetail) => {
        return (
          <SizeMeasurementsListItem
            optionDetail={optionDetail}
            isSelected={optionDetail.id === selectedPartId}
            onClickSelect={onClickSelect}
          />
        );
      })}
    </>
  );
}
