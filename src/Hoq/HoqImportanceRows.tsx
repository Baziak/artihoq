import React from "react";
import { TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";
import { cellStyling, highlightColor } from "./styles";
import { text } from "stream/consumers";

interface HoqImportanceRowsProps {
  qfdState: QfdState;
}

const importanceStyling = {
  ...cellStyling,
  ...highlightColor,
  paddingLeft: 0,
  paddingRight: 0,
  textAlign: "center",
};

const HoqImportanceRows = ({ qfdState }: HoqImportanceRowsProps) => {
  const relativeImportance = [];

  const calculateImportance = (index: number) => {
    let importance = 0;
    for (let i = 0; i < qfdState.relationshipValues.length; i++) {
      importance += qfdState.relationshipValues[i][index] * qfdState.requirements[i].importance;
    }
    return importance;
  };

  for (let i = 0; i < qfdState.measures.length; i++) {
    relativeImportance.push(Math.round(calculateImportance(i) * 1000) / 1000);
  }

  const totalImportance = relativeImportance.reduce((a, b) => a + b, 0);

  const relativeImportancePercentage = totalImportance ? relativeImportance.map(
    (importance) => Math.round((importance / totalImportance) * 1000) / 10
  ) : Array(qfdState.measures.length).fill(0);

  // TODO fix cases when the percentage sum is less than 100
  //console.log(relativeImportancePercentage.reduce((a, b) => a + b, 0));

  return (
    <>
      <TableRow>
        <TableCell colSpan={2} sx={{...cellStyling, ...highlightColor}}>
          Absolute Importance
        </TableCell>
        {relativeImportance.map((importance, index) => (
          <TableCell key={index} sx={importanceStyling}>
            {importance}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={2} sx={{...cellStyling, ...highlightColor}}>
          Relative Importance (%)
        </TableCell>
        {relativeImportancePercentage.map((percentage, index) => (
          <TableCell key={index} sx={importanceStyling}>
            {percentage}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};

export default HoqImportanceRows;
