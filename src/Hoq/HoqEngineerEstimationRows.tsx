import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";
import { cellStyling, controlCellStyling, highlightColor } from "./styles";

interface HoqEngineerEstimationRowsProps {
  qfdState: QfdState;
}

const estimationStyling = {
  ...controlCellStyling,
  ...highlightColor,
  height: "40px",
};

const HoqEngineerEstimationRows = ({ qfdState }: HoqEngineerEstimationRowsProps) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          {index === 0 ? (
            <TableCell colSpan={2} rowSpan={5} sx={{...cellStyling, ...highlightColor}}>
              Engineer Estimation
            </TableCell>
          ) : (
            ""
          )}
          {qfdState.measures.map((measure) => (
            <TableCell key={measure.id} sx={estimationStyling}></TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default HoqEngineerEstimationRows;
