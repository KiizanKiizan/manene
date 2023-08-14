"use client";
import { useRouter } from "next/navigation";
import QrCodeReader from "../common/barcode/qr-code-reader";

export const ItemDetailContainer = () => {
  const router = useRouter();
  const handleScan = (id: number): void => {
    router.push(`/item_detail/${id}`);
  };
  return <QrCodeReader onScan={handleScan} />;
};
