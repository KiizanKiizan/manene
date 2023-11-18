import useItemsShow from "@/app/_api/item-location/useItemsShow";
import { DialogContent } from "@mui/material";
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
  withButton,
  changedParts,
  isSizeChanged,
  isRankChanged,
  onClickClose,
}: TProps) {
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
        <DialogContent>
          <ItemDetailCardContainer
            itemInfo={data}
            withButton={withButton}
            isSizeChanged={isSizeChanged}
            isRankChanged={isRankChanged}
            changedParts={changedParts}
          />
        </DialogContent>
      </DisableBackDialog>
    </>
  );
}
