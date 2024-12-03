import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import QfdState from "./QfdState";
import HoqMeasurementCell from "./HoqMeasurementCell";
import MeasureImprovementDirectionSelector from "./Inputs/MeasureImprovementDirectionSelector";
import HoqTechnicalCorrelations from "./HoqTechnicalCorrelations";
import { baseColor, cellStyling, controlCellStyling, highlightColor, verticalCellStyling } from "./styles";

interface HoqHeadProps {
  qfdState: QfdState;
  setMeasureValue: (modifiedRowIndex: number, newValue: string) => void;
  addMeasureAt: (rowIndex: number) => void;
  removeMeasureAt: (rowIndex: number) => void;
  setMeasureDirection: (index: number, newValue: number) => void;
  setTechnicalCorrelationValue: (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => void;
}

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

  const measureRowSpan = 3;

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
        <TableCell sx={{...cellStyling, ...baseColor}}>Direction of Improvement</TableCell>
        <TableCell sx={{...cellStyling, ...baseColor}}></TableCell>
        {qfdState.measures.map((measure, index) => (
          <TableCell key={measure.id} sx={{...controlCellStyling, ...baseColor}} ref={measureCellRefs[index]}>
            <MeasureImprovementDirectionSelector
              selectedValue={measure.direction}
              onChange={(newValue) => setMeasureDirection(index, newValue)}
            />
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell sx={{...cellStyling, ...baseColor}} rowSpan={measureRowSpan}></TableCell>
        <TableCell sx={{...verticalCellStyling, ...baseColor}} rowSpan={measureRowSpan}>
          User Importance
        </TableCell>
        {qfdState.measures.map((measure, index) => (
          <HoqMeasurementCell
            key={measure.id}
            measure={measure}
            rowSpan={measureRowSpan}
            onChange={(newValue) => setMeasureValue(index, newValue)}
            onAddMeasure={() => addMeasureAt(index + 1)}
            onRemoveMeasure={() => removeMeasureAt(index)}
          />
        ))}
        <TableCell colSpan={5} sx={{ ...cellStyling, ...highlightColor, height: "1rem", textAlign: "center" }}>
          User Ratings
        </TableCell>
      </TableRow>
      <TableRow>
        {[...Array(5)].map((index) => (
          <TableCell key={index} sx={{...cellStyling, ...highlightColor}}></TableCell>
        ))}
      </TableRow>
      <TableRow>
        {[...Array(5)].map((_, index) => (
          <TableCell key={index} sx={{ ...cellStyling, ...highlightColor, height: "1rem", textAlign: "center" }}>
            {index + 1}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};

export default HoqHead;
