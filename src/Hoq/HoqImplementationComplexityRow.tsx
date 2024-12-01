import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import NumericSelector from "./Inputs/NumericSelector";
import QfdState from "./QfdState";
import { cellStyling, controlCellStyling } from "./styles";

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
      <TableCell colSpan={2} sx={cellStyling}>
        Implementation Complexity
      </TableCell>
      {qfdState.measures.map((measure, index) => (
        <TableCell key={measure.id} sx={controlCellStyling}>
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
