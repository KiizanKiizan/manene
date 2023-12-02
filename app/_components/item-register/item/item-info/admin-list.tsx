import { TOption } from "@/app/_api/judge_throw_away/getJudgeThrowAwayOptions";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Box, List, ListItem, Typography } from "@mui/material";

type TProps = {
  adminOptions: TOption[];
  onClickAdmin: (id: number) => void;
  selectedAdminId?: number;
};

export default function AdminList({
  adminOptions,
  onClickAdmin,
  selectedAdminId,
}: TProps) {
  return (
    <>
      <Box padding={2} height="75vh" overflow="auto">
        <Typography variant="h6" marginLeft={2}>
          登録者
        </Typography>
        <List>
          {adminOptions.map((admin: TOption) => {
            return (
              <ListItem
                key={admin.value}
                onClick={() => onClickAdmin(admin.value)}
              >
                {admin.value === selectedAdminId ? (
                  <RadioButtonCheckedIcon color="primary" />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}

                <Typography variant="h6" marginLeft={2}>
                  {admin.name}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}
