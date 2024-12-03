import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import NumericSelector from "./Inputs/NumericSelector";
import QfdState from "./QfdState";
import { baseColor, cellStyling, controlCellStyling } from "./styles";

interface HoqImplementationComplexityRowProps {
  qfdState: QfdState;
  setMeasureImplementationComplexity: (modifiedItemIndex: number, newValue: number) => void;
}

const HoqImplementationComplexityRow = ({
  qfdState,
  setMeasureImplementationComplexity,
}: HoqImplementationComplexityRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={2} sx={{...cellStyling, ...baseColor}}>
        Implementation Complexity
      </TableCell>
      {qfdState.measures.map((measure, index) => (
        <TableCell key={measure.id} sx={{...controlCellStyling, ...baseColor}}>
          <NumericSelector
            selectedValue={measure.complexity}
            onChange={(newValue) => setMeasureImplementationComplexity(index, newValue)}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default HoqImplementationComplexityRow;
