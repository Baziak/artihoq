import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";
import { cellStyling, controlCellStyling, highlightColor } from "./styles";

interface HoqTechBenchmarkRowsProps {
  qfdState: QfdState;
}

const techBenckmarkStyling = {
  ...controlCellStyling,
  ...highlightColor,
  height: "40px",
};

const HoqTechBenchmarkRows = ({ qfdState }: HoqTechBenchmarkRowsProps) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          {index === 0 ? (
            <TableCell colSpan={2} rowSpan={5} sx={{...cellStyling, ...highlightColor}}>
              Technical Benchmark
            </TableCell>
          ) : (
            ""
          )}
          {qfdState.measures.map((measure) => (
            <TableCell key={measure.id} sx={techBenckmarkStyling}></TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default HoqTechBenchmarkRows;
