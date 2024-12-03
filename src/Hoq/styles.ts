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

export const verticalCellStyling = {
  ...cellStyling,
  transform: "rotate(180deg)",
  writingMode: "vertical-rl",
};

export const highlightColor = {
  backgroundColor: "#FFF3E4",
}

export const focusColor = {
  backgroundColor: "#FFFFE0",
}

export const baseColor = {
  backgroundColor: "#FFF0ED",
}
