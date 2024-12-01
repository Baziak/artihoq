  import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";

interface HoqImplementationComplexityRowProps {
  qfdState: any;
}

const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
};

const HoqImplementationComplexityRow = ({ qfdState }: HoqImplementationComplexityRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={2} sx={cellStyling}>Implementation Complexity</TableCell>
      {[...Array(qfdState.measures.length)].map((_, index) => (
        <TableCell key={index} sx={cellStyling}></TableCell>
      ))}
    </TableRow>
  );
};

export default HoqImplementationComplexityRow;
