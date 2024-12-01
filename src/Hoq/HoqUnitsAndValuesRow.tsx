  import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";
import { cellStyling, verticalCellStyling } from "./styles";
import VerticalInputField from "./Inputs/VerticalInputField";

interface HoqUnitsAndValuesRowProps {
  qfdState: QfdState;
  setMeasureUnit: (modifiedItemIndex: number, newValue: string) => void;
}

const HoqUnitsAndValuesRow = ({ qfdState, setMeasureUnit }: HoqUnitsAndValuesRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={2} sx={cellStyling}>Units & Values</TableCell>
      {qfdState.measures.map((measure, index) => (
        <TableCell key={measure.id} sx={verticalCellStyling}>
          <VerticalInputField value={measure.unit} onChange={(newValue) => setMeasureUnit(index, newValue)} />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default HoqUnitsAndValuesRow;
