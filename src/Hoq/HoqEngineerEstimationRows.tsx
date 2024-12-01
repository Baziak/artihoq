import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";

interface HoqEngineerEstimationRowsProps {
  qfdState: QfdState;
}

const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
};

const HoqEngineerEstimationRows = ({ qfdState }: HoqEngineerEstimationRowsProps) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          {index === 0 ? (
            <TableCell colSpan={2} rowSpan={5} sx={cellStyling}>
              Engineer Estimation
            </TableCell>
          ) : ""}
          {qfdState.measures.map((measure) => (
            <TableCell key={measure.id} sx={cellStyling}></TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default HoqEngineerEstimationRows;
