import { Theme } from "@mui/material";

export const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
};

export const controlCellStyling = {
  ...cellStyling,
  padding: 0,
  width: 40,
  textAlign: "center",
};
