import React from "react";
import { TableCell, TableRow } from "@mui/material";
import NumericSelector from "./Inputs/NumericSelector";
import QfdState from "./QfdState";
import { baseColor, cellStyling, controlCellStyling } from "./styles";
import NumericTextField from "./Inputs/NumericTextField";
import { Settings } from "../SettingsDialog";

interface HoqImplementationComplexityRowProps {
  qfdState: QfdState;
  setMeasureImplementationComplexity: (modifiedItemIndex: number, newValue: number) => void;
  settings: Settings;
}

const HoqImplementationComplexityRow = ({
  qfdState,
  setMeasureImplementationComplexity,
  settings,
}: HoqImplementationComplexityRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={2} sx={{ ...cellStyling, ...baseColor }}>
        Implementation Complexity
      </TableCell>
      {qfdState.measures.map((measure, index) => (
        <TableCell key={measure.id} sx={{ ...controlCellStyling, ...baseColor }}>
          {settings.complexityLevelControl === "input" ? (
            <NumericTextField
              value={measure.complexity}
              onChange={(newValue) => setMeasureImplementationComplexity(index, newValue)}
            />
          ) : (
            <NumericSelector
              selectedValue={measure.complexity}
              onChange={(newValue) => setMeasureImplementationComplexity(index, newValue)}
              maxValue={5}
            />
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default HoqImplementationComplexityRow;
