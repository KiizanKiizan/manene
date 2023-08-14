import useItemsShow from "@/app/api/item-location/useItemsShow";
import { Dialog, DialogContent } from "@mui/material";
import { useEffect } from "react";
import ItemDetailCardContainer from "../common/Item/item-detail-card-container";
import ErrorDialog from "../common/dialog/error-dialog";
import LoadingDialog from "../common/dialog/loading-dialog";

type TProps = {
  itemId: number;
  onClickClose: () => void;
};

export default function ItemDetailFetcher({ itemId, onClickClose }: TProps) {
  const { data, error, isLoading } = useItemsShow({ id: itemId });

  useEffect(() => {
    addEventListener("popstate", onClickClose);
  }, [onClickClose]);

  if (error) return <ErrorDialog message={error.message} />;
  if (isLoading || !data) return <LoadingDialog />;

  return (
    <>
      <Dialog open onClose={onClickClose}>
        <DialogContent>
          <ItemDetailCardContainer itemInfo={data} />
        </DialogContent>
      </Dialog>
    </>
  );
}
