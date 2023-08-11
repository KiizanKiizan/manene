"use client";
import { TItemLocationsItemScanResponse } from "@/app/api/item-location/useItemLocationsItemScan";
import useItemLocationsMove from "@/app/api/item-location/useItemLocationsMove";
import { alertClosedWindow } from "@/app/service/shared/alert-close-window";
import { Box } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ItemRegister from "../common/Item/item-register";
import useDisableBrowserBack from "../common/custom-hook/useDisableBrowserBack";
import LoadingDialog from "../common/dialog/loading-dialog";
import ItemList from "./item-list";
import ItemLocationFetcher from "./item-location-fetcher";
import LocationRegister from "./location-register";

export default function ItemLocationContainer() {
  const [itemId, setItemId] = useState<number>();
  const [selectedItem, setSelectedItem] = useState<
    TItemLocationsItemScanResponse[]
  >([]);
  const [locationId, setLocationId] = useState<number>();

  const {
    isDialogOpen: isItemScanDialogOpen,
    handleClickCloseDialog: handleClickItemScanCloseDialog,
    handleClickOpenDialog: handleClickItemScanOpenDialog,
  } = useDisableBrowserBack();

  const {
    isDialogOpen: isLocationScanDialogOpen,
    handleClickCloseDialog: handleClickLocationScanCloseDialog,
    handleClickOpenDialog: handleClickLocationScanOpenDialog,
  } = useDisableBrowserBack();

  const { mutate, isLoading } = useItemLocationsMove();

  const canAddSelectedItem = (targetId: number): boolean => {
    return selectedItem.some((item) => item.id === targetId);
  };

  const onScanItemId = (id: number) => {
    canAddSelectedItem(id)
      ? alert("このアイテムは既にに読み取り済みです")
      : setItemId(id);
  };

  const handleClickOkButton = () => {
    if (locationId === undefined)
      throw new Error("棚移動に失敗しました。棚番号を正しく入力してください");
    mutate(
      {
        targetLocationId: locationId,
        itemIds: selectedItem.map((item) => item.id),
      },
      {
        onSuccess: () => {
          alert(`棚番号${locationId}に登録しました`);
          setSelectedItem([]);
        },
        onError: (e: AxiosError) => {
          alert(`登録に失敗しました ${e.request?.response}`);
        },
      }
    );
    setLocationId(undefined);
    handleClickLocationScanCloseDialog();
  };

  useEffect(() => {
    alertClosedWindow(!selectedItem);
  }, [selectedItem]);

  if (isLoading) return <LoadingDialog />;

  return (
    <>
      {itemId && (
        <ItemLocationFetcher
          itemId={itemId}
          onSetItem={(data: TItemLocationsItemScanResponse) =>
            setSelectedItem([...selectedItem, data])
          }
          onUnSetItemId={() => setItemId(undefined)}
        />
      )}

      <ItemList selectedItems={selectedItem} />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          left: "50%",
          transform: "translateX(-50%)",
          justifyContent: "center",
          gap: 2,
          marginBottom: "30px",
        }}
      >
        <ItemRegister
          isOpen={isItemScanDialogOpen}
          onClickCloseDialog={handleClickItemScanCloseDialog}
          onClickOpenDialog={handleClickItemScanOpenDialog}
          onScan={onScanItemId}
        />

        <LocationRegister
          locationId={locationId}
          selectedItem={selectedItem}
          isOpen={isLocationScanDialogOpen}
          onClickCloseDialog={handleClickLocationScanCloseDialog}
          onClickOpenDialog={handleClickLocationScanOpenDialog}
          onScan={(id: number) => {
            setLocationId(id);
          }}
          onClickCancel={() => setLocationId(undefined)}
          onClickOk={handleClickOkButton}
          isLoading={isLoading}
        />
      </Box>
    </>
  );
}
