'use client';
import { SizeMeasurementsContainer } from '../_components/size_measurements/size-measurements-container';
import SizeMeasurementsListItem from '../_components/size_measurements/[id]/size-measurements-list-item';

export default function SizeMeasurementsPage() {
  return (
    <>
      <SizeMeasurementsContainer />
      <SizeMeasurementsListItem
        optionDetail={{
          id: 0,
          partName: 'ヒップ',
          preMeasurement: 100,
          newMeasurement: 150,
          actionMessage: 'スキップ',
        }}
        isSelected={true}
        onClickSelect={function (id: number): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
}
