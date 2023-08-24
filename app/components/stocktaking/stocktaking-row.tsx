"use client";
import DoneIcon from "@mui/icons-material/Done";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import {
  STATUS,
  TLocation,
} from "../../api/stocktaking/getStocktakingsCurrent";

type TProps = {
  location: TLocation;
  onClick: (id: number) => void;
};

export default function StocktakingRow({ location, onClick }: TProps) {
  return (
    <ListItem disablePadding divider id="stocktaking-row">
      <ListItemButton
        onClick={() => onClick(location.id)}
        sx={{
          display: "grid",
          gridTemplateColumns: "min-content 1fr auto auto",
          alignItems: "center",
          gap: "1rem",
          backgroundColor:
            location.status === STATUS.DONE
              ? "success.main"
              : location.unscannedCount || location.mismatchingCount
              ? "warning.main"
              : "white",
        }}
      >
        {location.status === STATUS.DONE ? (
          <DoneIcon data-testid="checked" />
        ) : (
          <Box width="24px" />
        )}
        <ListItemText
          primary={`${location.mLocationName} ${location.totalCount}着`}
        />

        {location.status === STATUS.IN_PROGRESS && (
          <>
            {!!location.unscannedCount && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="warning.dark"
                width={50}
                borderRadius={30}
                data-testid="unscanned"
              >
                未{location.unscannedCount}
              </Box>
            )}
            {!!location.mismatchingCount && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="warning.light"
                width={50}
                borderRadius={30}
                data-testid="mismatching"
              >
                不{location.mismatchingCount}
              </Box>
            )}
          </>
        )}
      </ListItemButton>
    </ListItem>
  );
}
