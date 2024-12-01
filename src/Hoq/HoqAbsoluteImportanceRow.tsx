  import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";

interface HoqAbsoluteImportanceRowProps {
  qfdState: any;
}

const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
};

const HoqAbsoluteImportanceRow = ({ qfdState }: HoqAbsoluteImportanceRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={2} sx={cellStyling}>Absolute Importance</TableCell>
      {[...Array(qfdState.measures.length)].map((_, index) => (
        <TableCell key={index} sx={cellStyling}></TableCell>
      ))}
    </TableRow>
  );
};

export default HoqAbsoluteImportanceRow;
