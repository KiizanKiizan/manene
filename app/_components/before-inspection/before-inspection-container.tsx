"use client";
import useBeforeInspectionsCreate, {
  TBeforeInspectionsCreateResponse,
  TChart,
  TItemInfo,
} from "@/app/_api/before-inspections/useBeforeInspectionsCreate";
import useBeforeInspectionsInspect from "@/app/_api/before-inspections/useBeforeInspectionsInspect";
import useBeforeInspectionsToMisplacedItem from "@/app/_api/before-inspections/useBeforeInspectionsToMisplacedItem";
import { TInspectionGroup } from "@/app/_api/inspection-groups/getInspectionGroupsIndex";
import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QrCodeReader from "../common/barcode/qr-code-reader";
import ChartCard from "../common/card/chart-card";
import DisableBackDialog from "../common/dialog/disable-back-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";
import ItemCard from "../common/item/item-card";
import ItemInfoCard from "../common/item/item-info-card";
import Header from "../common/pages/header";
import BeforeInspectionList from "./before-inspection-list";

type TProps = {
  inspectionGroup: TInspectionGroup | null;
};

export default function BeforeInspectionContainer({ inspectionGroup }: TProps) {
  const router = useRouter();
  const { mutate: createMutate, isLoading: isCreateLoading } =
    useBeforeInspectionsCreate();
  const { mutate: toMisplacedMutate, isLoading: isToMisplacedLoading } =
    useBeforeInspectionsToMisplacedItem();
  const { mutate: inspectMutate, isLoading: isInspectLoading } =
    useBeforeInspectionsInspect();
  const [inspectionData, setInspectionData] =
    useState<Omit<TBeforeInspectionsCreateResponse, "tChart">>();
  const [registeredChart, setRegisteredChart] = useState<TChart>();
  const [misplacedItemId, setMisplacedItemId] = useState<number>();

  const onScanCreateBeforeInspection = (itemId: number) => {
    createMutate(
      { itemId: itemId },
      {
        onSuccess(response) {
          setInspectionData({
            isCreatedInspectionData: response.data.isCreatedInspectionData,
            registeredInspectionGroup: response.data.registeredInspectionGroup,
            acceptingInspectionGroup: response.data.acceptingInspectionGroup,
            isChartInspected: response.data.isChartInspected,
          });
          setRegisteredChart(response.data.tChart);
        },
        onError(error: AxiosError) {
          alert(
            `検品グループへの登録に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        },
      }
    );
  };

  const handleClickToMisplaced = (id: number) => {
    toMisplacedMutate(
      { chartItemId: id },
      {
        onSuccess(response) {
          setRegisteredChart(response.data);
          alert("入れ忘れ登録を完了しました。");
        },
        onError(error: AxiosError) {
          alert(
            `入れ忘れ登録に失敗しました。 ${
              (error.response?.data as { message: string })?.message
            }`
          );
        },
      }
    );
    setMisplacedItemId(undefined);
  };

  const handleClickInspect = () => {
    if (registeredChart) {
      inspectMutate(
        { chartId: registeredChart?.id },
        {
          onSuccess(response) {
            setInspectionData({
              isCreatedInspectionData: response.data.isCreatedInspectionData,
              registeredInspectionGroup:
                response.data.registeredInspectionGroup,
              acceptingInspectionGroup: response.data.acceptingInspectionGroup,
              isChartInspected: response.data.isChartInspected,
            });
            setRegisteredChart(response.data.tChart);
            alert("即時検品処理を完了しました。");
          },
          onError(error: AxiosError) {
            alert(
              `即時検品に失敗しました。 ${
                (error.response?.data as { message: string })?.message
              }`
            );
          },
        }
      );
    }
  };

  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <>
      <LoadingDialog
        isOpen={isCreateLoading || isToMisplacedLoading || isInspectLoading}
      />
      <Header title="返却検品前登録">
        <Typography>
          グループ{inspectionGroup ? inspectionGroup.groupNo : "なし"}
        </Typography>
      </Header>

      <QrCodeReader
        onScan={(id: number) => onScanCreateBeforeInspection(id)}
        isRectangle
      />
      {inspectionData && (
        <Box margin={2}>
          {inspectionData.isChartInspected ? (
            <Alert severity="info">検品処理済みです</Alert>
          ) : inspectionData.isCreatedInspectionData ? (
            <Alert severity="info">
              グループ{inspectionData.registeredInspectionGroup.groupNo}
              に登録しました
            </Alert>
          ) : (
            <Alert severity="warning">
              グループ{inspectionData.registeredInspectionGroup.groupNo}
              に登録済みです
            </Alert>
          )}
        </Box>
      )}

      {registeredChart && (
        <>
          <ChartCard
            id={registeredChart.id}
            tMemberId={registeredChart.tMemberId}
            name={registeredChart.name}
            deliveryDate={registeredChart.deliveryDate}
            tChartItems={registeredChart.tChartItems}
          />

          <BeforeInspectionList
            chartItems={registeredChart.tChartItems}
            onClick={(id: number) => setMisplacedItemId(id)}
            isLoading={isToMisplacedLoading}
          />
          <Box display="flex" justifyContent="center" marginY={2}>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                backgroundColor: "primary.main",
                width: "90%",
              }}
              onClick={handleClickInspect}
              disabled={isInspectLoading}
            >
              即時検品する
            </Button>
          </Box>
        </>
      )}

      {misplacedItemId && (
        <DisableBackDialog
          open={!!misplacedItemId}
          onClose={() => setMisplacedItemId(undefined)}
        >
          <DialogTitle>入れ忘れを登録しますか？</DialogTitle>
          <DialogContent>
            <ItemCard
              imagePath={
                registeredChart?.tChartItems.find(
                  (item) => item.id === misplacedItemId
                )?.itemInfo.itemImageUrl as string
              }
              divider={false}
            >
              <ItemInfoCard
                itemInfo={
                  registeredChart?.tChartItems.find(
                    (item) => item.id === misplacedItemId
                  )?.itemInfo as TItemInfo
                }
                chartItemId={0}
              />
            </ItemCard>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMisplacedItemId(undefined)}>
              キャンセル
            </Button>
            <Button onClick={() => handleClickToMisplaced(misplacedItemId)}>
              OK
            </Button>
          </DialogActions>
        </DisableBackDialog>
      )}
    </>
  );
}
