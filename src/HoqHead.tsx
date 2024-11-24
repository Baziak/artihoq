import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";
import HoqMeasurementCell from "./HoqMeasurementCell";
import MeasureImprovementDirectionSelector from "./MeasureImprovementDirectionSelector";

interface HoqHeadProps {
  qfdState: QfdState;
  setMeasureValue: (modifiedRowIndex: number, newValue: string) => void;
  addMeasureAt: (rowIndex: number) => void;
  removeMeasureAt: (rowIndex: number) => void;
  setMeasureDirection: (index: number, newValue: number) => void;
}

const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
};

const measuresCellStyling = {
  ...cellStyling,
  transform: "rotate(180deg)",
  minHeight: 128,
  maxHeight: 256,
  writingMode: "vertical-rl",
};

const HoqHead = ({ qfdState, setMeasureValue, addMeasureAt, removeMeasureAt, setMeasureDirection }: HoqHeadProps) => {
  return (
    <>
      <TableRow>
        <TableCell sx={cellStyling}>Direction of Improvement</TableCell>
        <TableCell sx={cellStyling}></TableCell>
        {qfdState.measures.map((measure, index) => (
          <TableCell key={measure.id} sx={cellStyling}>
            <MeasureImprovementDirectionSelector
              selectedValue={measure.direction}
              onChange={(newValue) => setMeasureDirection(index, newValue)}
            />
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell></TableCell>
        <TableCell sx={measuresCellStyling}>User Importance</TableCell>
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
    </>
  );
};

export default HoqHead;
