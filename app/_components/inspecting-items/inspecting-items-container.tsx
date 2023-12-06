"use client";
import fetchInspectingItemsShow, {
  TInspectingItem,
} from "@/app/_api/inspecting-items/fetchInspectingItemsShow";
import { TImage } from "@/app/_api/inspecting-items/useInspectingItemsToPurchaseItem";
import {
  INSPECTION_STATUS,
  getStatusText,
} from "@/app/_utils/functions/getStatusText";
import { Alert, Box, SelectChangeEvent, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import QrCodeReader from "../common/barcode/qr-code-reader";
import ChartCard from "../common/card/chart-card";
import DisableBackDialog from "../common/dialog/disable-back-dialog";
import ItemCard from "../common/item/item-card";
import ItemInfoCard from "../common/item/item-info-card";
import Header from "../common/pages/header";
import InspectingItemsSender from "./inspecting-items-sender";
import PurchaseRequestForm from "./purchase-request-form";

export default function InspectionItemsContainer() {
  const [selectedImages, setSelectedImages] = useState<TImage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [requestReason, setRequestReason] = useState<number>();
  const [scannedInspectingItem, setScannedInspectingItem] =
    useState<TInspectingItem>();
  const [encloseItemId, setEncloseItemId] = useState<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleScan = (itemId: number) => {
    fetchInspectingItemsShow({ id: itemId })
      .then((res) => {
        setScannedInspectingItem(res.tInspectionItem);
        setSelectedImages([]);
        setMessage("");
        setRequestReason(undefined);
      })
      .catch((error: AxiosError) =>
        alert(`アイテムスキャンに失敗しました。 ${error.message}`)
      );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileArray = Array.from(event.target.files);
      const promises = fileArray.map((file) => {
        return new Promise<TImage>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              imageData: reader.result as string,
              imageFileName: file.name,
            });
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(promises).then((images) =>
        setSelectedImages((prev) => [...prev, ...images])
      );
    }
  };
  return (
    <>
      <Header title="返却検品中操作" />
      <QrCodeReader onScan={(id: number) => handleScan(id)} isRectangle />
      {scannedInspectingItem && (
        <>
          <Box margin={2}>
            {scannedInspectingItem.isChartInspected ? (
              <Alert severity="warning">検品処理済みのカルテです。</Alert>
            ) : (
              <Alert severity="warning">
                グループ{scannedInspectingItem.groupNo}
                に登録済みです
              </Alert>
            )}
          </Box>
          <Box marginBottom={1}>
            <ChartCard
              id={scannedInspectingItem.tChart.id}
              tMemberId={scannedInspectingItem.tChart.tMemberId}
              name={scannedInspectingItem.tChart.name}
              deliveryDate={scannedInspectingItem.tChart.rentalStartedAt}
            />
          </Box>
          <ItemCard
            imagePath={scannedInspectingItem.itemInfo.itemImageUrl}
            divider={false}
          >
            <ItemInfoCard itemInfo={scannedInspectingItem.itemInfo} />
          </ItemCard>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height={80}
          >
            {scannedInspectingItem.status === INSPECTION_STATUS.MISPLACED ? (
              <Typography variant="h6" color="warning.light">
                {getStatusText(scannedInspectingItem.status)}
              </Typography>
            ) : scannedInspectingItem.status === INSPECTION_STATUS.INSPECTED ? (
              <Typography variant="h6" color="success.dark">
                {getStatusText(scannedInspectingItem.status)}
              </Typography>
            ) : (
              <Typography variant="h6" color="warning.dark">
                {getStatusText(scannedInspectingItem.status)}
              </Typography>
            )}
            {encloseItemId && <Typography>ID: {encloseItemId}</Typography>}
          </Box>
          <InspectingItemsSender
            scannedInspectingItem={scannedInspectingItem}
            onClickPurchaseRequestOpen={() => setIsOpen(true)}
            onSetInspectingItem={(inspectingItem: TInspectingItem) =>
              setScannedInspectingItem(inspectingItem)
            }
          />
          <DisableBackDialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            fullScreen
          >
            <PurchaseRequestForm
              inspectingItemId={scannedInspectingItem.id}
              itemInfo={scannedInspectingItem.itemInfo}
              selectedImages={selectedImages}
              onChangeImage={handleImageChange}
              message={message}
              onChangeInput={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setMessage(e.target.value)}
              requestReason={requestReason}
              onChangeSelect={(e: SelectChangeEvent<number>) =>
                setRequestReason(e.target.value as number)
              }
              onClose={() => setIsOpen(false)}
              onSetInspectingItem={(inspectingItem: TInspectingItem) =>
                setScannedInspectingItem(inspectingItem)
              }
              onSetEnclosedItemid={(id: number) => setEncloseItemId(id)}
            />
          </DisableBackDialog>
        </>
      )}
    </>
  );
}
