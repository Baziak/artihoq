import React, { useEffect, useState } from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";
import HoqMeasurementCell from "./HoqMeasurementCell";
import MeasureImprovementDirectionSelector from "./Inputs/MeasureImprovementDirectionSelector";
import HoqTechnicalCorrelations from "./HoqTechnicalCorrelations";

interface HoqHeadProps {
  qfdState: QfdState;
  setMeasureValue: (modifiedRowIndex: number, newValue: string) => void;
  addMeasureAt: (rowIndex: number) => void;
  removeMeasureAt: (rowIndex: number) => void;
  setMeasureDirection: (index: number, newValue: number) => void;
  setTechnicalCorrelationValue: (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => void;
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

const HoqHead = ({
  qfdState,
  setMeasureValue,
  addMeasureAt,
  removeMeasureAt,
  setMeasureDirection,
  setTechnicalCorrelationValue,
}: HoqHeadProps) => {
  const measureCellRefs: React.RefObject<HTMLTableCellElement>[] = [];
  for (let i = 0; i < qfdState.measures.length; i++) {
    measureCellRefs.push(React.createRef());
  }

  const [measureCellsWidths, setMeasureCellsWidths] = useState<number[]>(Array(qfdState.measures.length).fill(0));

  useEffect(() => {
    setMeasureCellsWidths(measureCellRefs.map((ref) => (ref.current ? ref.current.offsetWidth : 0)));
  }, [qfdState.measures]);

  return (
    <>
      <TableRow>
        <TableCell colSpan={2}></TableCell>
        <TableCell colSpan={qfdState.measures.length} sx={{ overflow: "hidden", padding: 0 }}>
          <HoqTechnicalCorrelations
            qfdState={qfdState}
            measureCellsWidths={measureCellsWidths}
            setTechnicalCorrelationValue={setTechnicalCorrelationValue}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={cellStyling}>Direction of Improvement</TableCell>
        <TableCell sx={cellStyling}></TableCell>
        {qfdState.measures.map((measure, index) => (
          <TableCell key={measure.id} sx={{ ...cellStyling, textAlign: "center" }} ref={measureCellRefs[index]}>
            <MeasureImprovementDirectionSelector
              selectedValue={measure.direction}
              onChange={(newValue) => setMeasureDirection(index, newValue)}
            />
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell sx={cellStyling}></TableCell>
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
