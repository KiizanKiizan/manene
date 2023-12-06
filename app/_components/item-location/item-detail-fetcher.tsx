import useItemsShow from "@/app/_api/item-location/useItemsShow";
import { Box, Button, DialogContent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ItemDetailCardContainer from "../common/Item/item-detail-card-container";
import DisableBackDialog from "../common/dialog/disable-back-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";

type TProps = {
  itemId: number;
  withButton?: boolean;
  changedParts?: string[];
  isSizeChanged?: boolean;
  isRankChanged?: boolean;
  onClickClose: () => void;
};

export default function ItemDetailFetcher({
  itemId,
  withButton = false,
  changedParts,
  isSizeChanged,
  isRankChanged,
  onClickClose,
}: TProps) {
  const router = useRouter();
  const { data, error, isLoading } = useItemsShow({ id: itemId });

  useEffect(() => {
    addEventListener("popstate", onClickClose);
  }, [onClickClose]);

  if (error) {
    alert(error.message);
  }
  if (isLoading || !data) return <LoadingDialog isOpen />;
  return (
    <>
      <DisableBackDialog open onClose={onClickClose}>
        <DialogContent sx={{ paddingX: 0 }}>
          <ItemDetailCardContainer
            itemInfo={data}
            isSizeChanged={isSizeChanged}
            isRankChanged={isRankChanged}
            changedParts={changedParts}
          />
          {withButton && (
            <Box
              display="flex"
              paddingX={3}
              paddingBottom={3}
              height={45}
              justifyContent="space-between"
            >
              <Button
                variant="outlined"
                sx={{ width: "48%", fontSize: "0.8rem" }}
                onClick={() => router.push("/")}
              >
                終了
              </Button>
              <Button
                variant="contained"
                sx={{ width: "48%", fontSize: "0.8rem" }}
                onClick={() => router.push("/size_measurements")}
              >
                続けて計測する
              </Button>
            </Box>
          )}
        </DialogContent>
      </DisableBackDialog>
    </>
  );
}
