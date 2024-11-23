import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";
import HoqMeasurementCell from "./HoqMeasurementCell";

interface HoqHeadProps {
  qfdState: QfdState;
  setMeasureValue: (modifiedRowIndex: number, newValue: string) => void;
  addMeasureAt: (rowIndex: number) => void;
  removeMeasureAt: (rowIndex: number) => void;
}

const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
  transform: "rotate(180deg)",
  minHeight: 128,
  maxHeight: 256,
  writingMode: "vertical-rl",
};

const HoqHead = ({ qfdState, setMeasureValue, addMeasureAt, removeMeasureAt }: HoqHeadProps) => {
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell sx={cellStyling}>User Importance</TableCell>
      {qfdState.measures.map((measure, index) => (
        <HoqMeasurementCell
          key={measure.id}
          measure={measure}
          onChange={(newValue) => setMeasureValue(index, newValue)}
          onAddMeasure={() => addMeasureAt(index + 1)}
          onRemoveMeasure={() => removeMeasureAt(index)}
        />
      ))}
    </TableRow>
  );
};

export default HoqHead;
