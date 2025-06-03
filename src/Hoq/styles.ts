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

export const competitorColors = [
  '#FF6347', // Tomato
  '#32CD32', // LimeGreen
  '#4682B4', // SteelBlue
  '#DA70D6', // Orchid
  '#FFD700', // Gold
];
