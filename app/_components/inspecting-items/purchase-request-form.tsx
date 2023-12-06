"use client";
import { TItemInfo } from "@/app/_api/before-inspections/useBeforeInspectionsCreate";
import { TInspectingItem } from "@/app/_api/inspecting-items/fetchInspectingItemsShow";
import useInspectingItemsToPurchaseItem, {
  TImage,
} from "@/app/_api/inspecting-items/useInspectingItemsToPurchaseItem";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import Image from "next/image";
import React from "react";
import ItemCard from "../common/Item/item-card";
import ItemInfoCard from "../common/Item/item-info-card";
import LoadingDialog from "../common/dialog/loading-dialog";
import Header from "../common/pages/header";
import SectionHeader from "../common/pages/section-header";
type TProps = {
  inspectingItemId: number;
  itemInfo: TItemInfo;
  selectedImages: TImage[];
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
  onChangeInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  requestReason: number | undefined;
  onChangeSelect: (e: SelectChangeEvent<number>) => void;
  onClose: () => void;
  onSetInspectingItem: (inspectingItem: TInspectingItem) => void;
  onSetEnclosedItemid: (id: number) => void;
};

export const REQUEST_REASON = {
  UNCLEANNESS: 0,
  OTHER: 1,
} as const;

export default function PurchaseRequestForm({
  inspectingItemId,
  itemInfo,
  selectedImages,
  onChangeImage,
  message,
  onChangeInput,
  requestReason,
  onChangeSelect,
  onClose,
  onSetInspectingItem,
  onSetEnclosedItemid,
}: TProps) {
  const { mutate, isLoading } = useInspectingItemsToPurchaseItem({
    id: inspectingItemId,
  });
  const handleClickRegister = () => {
    if (!!message && requestReason !== undefined && selectedImages.length > 0) {
      mutate(
        {
          memo: message,
          images: selectedImages.map((image) => {
            return {
              imageData: image.imageData.split(",")[1],
              imageFileName: image.imageFileName,
            };
          }),
          purchaseRequestReason: requestReason,
        },
        {
          onSuccess(response) {
            alert("買取依頼登録を完了しました。");
            onSetInspectingItem(response.data.tInspectionItem);
            onSetEnclosedItemid(response.data.tEncloseItemId);
            onClose();
          },
          onError(error: AxiosError) {
            alert(
              `汚れ確認中登録に失敗しました。 ${
                (error.response?.data as { message: string })?.message
              }`
            );
          },
        }
      );
    }
  };
  return (
    <>
      <LoadingDialog isOpen={isLoading} />
      <Header title="買取依頼" />

      <Box marginY={2}>
        <ItemCard imagePath={itemInfo.itemImageUrl} divider={false}>
          <ItemInfoCard itemInfo={itemInfo} />
        </ItemCard>
      </Box>

      <SectionHeader>画像</SectionHeader>
      <Box display="flex" flexWrap="wrap" margin={2}>
        {selectedImages.map((image, index) => (
          <Box key={image.imageFileName} marginX={3} marginBottom={2}>
            <Image
              src={image.imageData}
              alt={`selected-image-${index}`}
              width={70}
              height={125}
            />
          </Box>
        ))}
      </Box>

      <Box
        height={80}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button variant="contained" component="label">
          画像追加
          <input
            type="file"
            hidden
            accept="image/*"
            capture="environment"
            onChange={onChangeImage}
            multiple
          />
        </Button>
      </Box>

      <SectionHeader>コメント</SectionHeader>
      <Box margin={1}>
        <TextField
          value={message}
          fullWidth
          multiline
          rows={4}
          onChange={onChangeInput}
        ></TextField>
      </Box>

      <SectionHeader>依頼理由</SectionHeader>
      <Box marginX={1} marginY={2}>
        <FormControl sx={{ width: "150px" }}>
          <InputLabel id="demo-simple-select-label">依頼理由</InputLabel>
          <Select
            value={requestReason ?? ""}
            label="request-reason"
            onChange={onChangeSelect}
          >
            <MenuItem value={REQUEST_REASON.UNCLEANNESS}>色抜け・欠損</MenuItem>
            <MenuItem value={REQUEST_REASON.OTHER}>破れ</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="center" marginY={5}>
        <Box display="flex" flexDirection="column" gap={2} width="90%">
          <Button
            variant="contained"
            onClick={handleClickRegister}
            disabled={
              !message ||
              requestReason === undefined ||
              selectedImages.length < 1
            }
            sx={{ height: "50px" }}
          >
            確定
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={onClose}
            sx={{ height: "50px" }}
          >
            キャンセル
          </Button>
        </Box>
      </Box>
    </>
  );
}
