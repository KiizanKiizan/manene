'use client';
import { useRouter } from 'next/navigation';
import QrCodeReader from '../common/barcode/qr-code-reader';

export const SizeMeasurementsContainer = () => {
  const router = useRouter();
  const handleScan = (id: number): void => {
    router.push(`/size_measurements/${id}`);
  };
  return <QrCodeReader onScan={handleScan} />;
};
