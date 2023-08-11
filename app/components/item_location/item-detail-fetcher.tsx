import useItemsShow from "@/app/api/item-location/useItemsShow";
import ItemDetailCardContainer from "../common/Item/item-detail-card-container";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { useEffect } from "react";

type TProps = {
  itemId: number;
  onClickClose: () => void;
};

export default function ItemDetailFetcher({ itemId, onClickClose }: TProps) {
  const { data, error, isLoading } = useItemsShow({ id: itemId });

  useEffect(() => {
    addEventListener("popstate", onClickClose);
  }, [onClickClose]);

  return (
    <>
      <Dialog
        open
        onClose={onClickClose}
        PaperProps={
          isLoading || (!data && !error)
            ? {
                style: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  overflow: "hidden",
                },
              }
            : {}
        }
      >
        <DialogContent>
          {error ? (
            error.message
          ) : isLoading || !data ? (
            <CircularProgress color="primary" />
          ) : (
            <ItemDetailCardContainer itemInfo={data} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
