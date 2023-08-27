"use client";
import { TItemLocationsItemScanResponse } from "@/app/api/item-location/useItemLocationsItemScan";
import { TStocktakingsLocationsShowResponse } from "@/app/api/stocktaking-location/getStocktakingLocationsShow";
import useStocktakingLocationCompleteScan from "@/app/api/stocktaking-location/useStocktakingLocationCompleteScan";
import useStocktakingLocationItemScan from "@/app/api/stocktaking-location/useStocktakingLocationItemScan";
import useStocktakingLocationMove from "@/app/api/stocktaking-location/useStocktakingLocationMove";
import { LOCATIONS } from "@/app/constants/location";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DisableBackDialog from "../common/dialog/disable-back-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";
import Header from "../common/pages/header";
import SubHeader from "../common/pages/sub-header";
import LocationItemTabs, { TAB_NUMBER } from "./location-item-tabs";

type TProps = {
  location: TStocktakingsLocationsShowResponse;
};
export default function StocktakingLocationContainer({ location }: TProps) {
  const router = useRouter();
  const [selectedTabNumber, setSelectedTabNumber] = useState<string>(
    TAB_NUMBER.FIRST
  );
  const handleChangeSelectedTab = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setSelectedTabNumber(newValue);
  };
  const [locationInfo, setLocationInfo] =
    useState<TStocktakingsLocationsShowResponse>(location);

  const [moveLocationId, setMoveLocationId] = useState<number>();
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] =
    useState<boolean>(false);
  const { mutate: itemScanMutate, isLoading: isItemScanLoading } =
    useStocktakingLocationItemScan({
      id: location.id,
    });
  const { mutate: moveMutate, isLoading: isMoveLoading } =
    useStocktakingLocationMove({
      id: location.id,
    });
  const { mutate: completeMutate, isLoading: isCompleteLoading } =
    useStocktakingLocationCompleteScan({ id: location.id });

  const [isMissingDialogOpen, setIsMissingDialogOpen] =
    useState<boolean>(false);

  const [isReturnLocationDialogOpen, setIsReturnLocationDialogOpen] =
    useState<boolean>(false);

  const handleScanItem = (id: number) => {
    if (
      locationInfo.matchedItems?.some(
        (item: TItemLocationsItemScanResponse) => item.id === id
      )
    ) {
      alert("このアイテムは既に読み取られています");
      return;
    }
    itemScanMutate(
      { id: location.id, scannedItemId: id },
      {
        onSuccess(response) {
          setLocationInfo(response.data.stocktakingLocationResponse);
          if (response.data.isMismatched) {
            alert("スキャンしたアイテムは不一致でした。");
          }
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

  const onMoveLocation = ({
    locationId,
    itemIds,
  }: {
    locationId: number;
    itemIds: number[];
  }) => {
    moveMutate(
      {
        id: location.id,
        targetLocationId: locationId,
        itemIds: itemIds,
      },
      {
        onSuccess(response) {
          setLocationInfo(response.data);
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
    setSelectedTabNumber(TAB_NUMBER.FIRST);
  };

  const onClickComplete = () => {
    completeMutate(undefined, {
      onSuccess: () => {
        router.push("/stocktaking");
        router.refresh();
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return (
    <>
      {(isItemScanLoading || isMoveLoading || isCompleteLoading) && (
        <LoadingDialog />
      )}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header title="棚卸し">
          <Button
            onClick={() => setIsCompleteDialogOpen(true)}
            disabled={!!locationInfo.mismatchingItems}
            sx={{ color: "white" }}
          >
            チェック完了
          </Button>
          <DisableBackDialog
            open={isCompleteDialogOpen}
            altCallback={() => setIsCompleteDialogOpen(false)}
            data-testId="disabled-back-button"
          >
            <DialogTitle>確認</DialogTitle>
            <DialogContent>確認を完了して一覧に戻りますか？</DialogContent>
            <DialogActions>
              <Button onClick={() => setIsCompleteDialogOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={onClickComplete} disabled={isCompleteLoading}>
                OK
              </Button>
            </DialogActions>
          </DisableBackDialog>
        </Header>
        <SubHeader>
          棚番: {location.mLocationId} {location.mLocationName}
        </SubHeader>
      </Box>

      <LocationItemTabs
        allItems={locationInfo.allItems}
        unscannedItems={locationInfo.unscannedItems}
        matchedItems={locationInfo.matchedItems}
        mismatchingItems={locationInfo.mismatchingItems}
        onScanItem={handleScanItem}
        onClickOpenMissingRegisterDialog={() => setIsMissingDialogOpen(true)}
        onClickOpenReturnLocationDialog={() =>
          setIsReturnLocationDialogOpen(true)
        }
        onScanLocationId={(id: number) => setMoveLocationId(id)}
        selectedTabNumber={selectedTabNumber}
        onChangeSelectedTab={handleChangeSelectedTab}
      />

      <DisableBackDialog
        open={isMissingDialogOpen}
        altCallback={() => setIsMissingDialogOpen(false)}
      >
        <DialogTitle>確認</DialogTitle>
        <DialogContent>行方不明として登録しますか？</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsMissingDialogOpen(false)}>
            キャンセル
          </Button>
          <Button
            onClick={() => {
              if (locationInfo.unscannedItems) {
                onMoveLocation({
                  locationId: LOCATIONS.MISSING,
                  itemIds: locationInfo.unscannedItems.map((item) => item.id),
                });
              } else {
                alert("未スキャンアイテムが存在しません");
              }
              setIsMissingDialogOpen(false);
            }}
            disabled={isMoveLoading}
          >
            OK
          </Button>
        </DialogActions>
      </DisableBackDialog>

      <DisableBackDialog
        open={isReturnLocationDialogOpen}
        altCallback={() => setIsReturnLocationDialogOpen(false)}
      >
        <DialogTitle>確認</DialogTitle>
        <DialogContent>この棚に戻しますか？</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsReturnLocationDialogOpen(false)}>
            キャンセル
          </Button>
          <Button
            onClick={() => {
              if (locationInfo.mismatchingItems) {
                onMoveLocation({
                  locationId: location.mLocationId,
                  itemIds: locationInfo.mismatchingItems.map((item) => item.id),
                });
              } else {
                alert("不一致アイテムが存在しません。");
              }
              setIsReturnLocationDialogOpen(false);
            }}
            disabled={isMoveLoading}
          >
            OK
          </Button>
        </DialogActions>
      </DisableBackDialog>

      {moveLocationId && (
        <Dialog open={!!moveLocationId} fullWidth>
          <DialogTitle>確認</DialogTitle>
          <DialogContent>
            <Typography>棚番:{moveLocationId} </Typography>
            <Typography>に登録しますか？ </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMoveLocationId(undefined)}>
              キャンセル
            </Button>
            <Button
              onClick={() => {
                if (locationInfo.mismatchingItems) {
                  onMoveLocation({
                    locationId: moveLocationId,
                    itemIds: locationInfo.mismatchingItems.map(
                      (item) => item.id
                    ),
                  });
                } else {
                  alert("不一致アイテムが存在しません。");
                }
                setMoveLocationId(undefined);
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
