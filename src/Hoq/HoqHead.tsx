import React, { useEffect, useState } from "react";
import { Box, Button, TableCell, TableRow } from "@mui/material";
import QfdState from "./QfdState";
import HoqMeasurementCell from "./HoqMeasurementCell";
import MeasureImprovementDirectionSelector from "./Inputs/MeasureImprovementDirectionSelector";
import HoqTechnicalCorrelations from "./HoqTechnicalCorrelations";
import { baseColor, cellStyling, controlCellStyling, highlightColor, verticalCellStyling } from "./styles";
import { Settings } from "../SettingsDialog";
import HoqCompetitorCell from "./HoqCompetitorCell";

interface HoqHeadProps {
  qfdState: QfdState;
  setMeasureValue: (modifiedRowIndex: number, newValue: string) => void;
  addMeasureAt: (rowIndex: number) => void;
  removeMeasureAt: (rowIndex: number) => void;
  setMeasureDirection: (index: number, newValue: number) => void;
  setTechnicalCorrelationValue: (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => void;
  settings: Settings;
  setCompetitorValue: (modifiedRowIndex: number, newValue: string) => void;
  addCompetitorAt: (rowIndex: number) => void;
  removeCompetitorAt: (rowIndex: number) => void;
}

const HoqHead = ({
  qfdState,
  setMeasureValue,
  addMeasureAt,
  removeMeasureAt,
  setMeasureDirection,
  setTechnicalCorrelationValue,
  settings,
  setCompetitorValue,
  addCompetitorAt,
  removeCompetitorAt,
}: HoqHeadProps) => {
  const measureCellRefs: React.RefObject<HTMLTableCellElement>[] = [];
  for (let i = 0; i < qfdState.measures.length; i++) {
    measureCellRefs.push(React.createRef());
  }

  const [measureCellsWidths, setMeasureCellsWidths] = useState<number[]>(Array(qfdState.measures.length).fill(0));

  useEffect(() => {
    setMeasureCellsWidths(measureCellRefs.map((ref) => (ref.current ? ref.current.offsetWidth : 0)));
  }, [qfdState.measures]);

  const MEASURE_ROW_SPAN = 3;
  const USER_RATING_SCALE = 5;
  const MAX_COMPETITORS = 5;

  return (
    <>
      <TableRow>
        <TableCell colSpan={2}></TableCell>
        <TableCell colSpan={qfdState.measures.length} sx={{ overflow: "hidden", padding: 0 }}>
          <HoqTechnicalCorrelations
            qfdState={qfdState}
            measureCellsWidths={measureCellsWidths}
            setTechnicalCorrelationValue={setTechnicalCorrelationValue}
            settings={settings}
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
        <TableCell sx={{...cellStyling, ...baseColor}} rowSpan={MEASURE_ROW_SPAN}></TableCell>
        <TableCell sx={{...verticalCellStyling, ...baseColor}} rowSpan={MEASURE_ROW_SPAN}>
          User Importance
        </TableCell>
        {qfdState.measures.map((measure, index) => (
          <HoqMeasurementCell
            key={measure.id}
            measure={measure}
            rowSpan={MEASURE_ROW_SPAN}
            onChange={(newValue) => setMeasureValue(index, newValue)}
            onAddMeasure={() => addMeasureAt(index + 1)}
            onRemoveMeasure={() => removeMeasureAt(index)}
          />
        ))}
        <TableCell colSpan={USER_RATING_SCALE} sx={{ ...cellStyling, ...highlightColor, height: "1rem", textAlign: "center" }}>
          User Ratings
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          id="userRatings"
          colSpan={USER_RATING_SCALE}
          sx={{ ...cellStyling, ...highlightColor }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {qfdState.competitors.length > 0 ? (
              qfdState.competitors.map((competitor, index) => (
                <Box
                  key={competitor.id}
                  sx={{
                    height: "160px",
                  }}
                >
                  <HoqCompetitorCell
                    competitor={competitor}
                    onChange={(newValue) => setCompetitorValue(index, newValue)}
                    onAddCompetitor={() => addCompetitorAt(index + 1)}
                    iconIndex={index}
                    canAddMore={qfdState.competitors.length < MAX_COMPETITORS}
                    onRemoveCompetitor={() => removeCompetitorAt(index)}
                  />
                </Box>
              ))
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => addCompetitorAt(0)}
                disabled={qfdState.competitors.length >= MAX_COMPETITORS}
              >
                Add Competitor
              </Button>
            )}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        {[...Array(USER_RATING_SCALE)].map((_, index) => (
          <TableCell key={index} sx={{ ...cellStyling, ...highlightColor, height: "1rem", textAlign: "center" }}>
            {index + 1}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};

export default HoqHead;
