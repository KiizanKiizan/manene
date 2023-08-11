import useItemsShow from "@/app/api/item-location/useItemsShow";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import ItemDetailCardContainer from "../common/Item/item-detail-card-container";

type TProps = {
  itemId: number;
  onClickClose: () => void;
};

export default function ItemDetailFetcher({ itemId, onClickClose }: TProps) {
  const { data, error, isLoading } = useItemsShow({ id: itemId });

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
