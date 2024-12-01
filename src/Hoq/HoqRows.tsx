import React from "react";
import { TableCell, TableRow } from "@mui/material";
import QfdState from "./QfdState";
import RelationshipLevelSelector from "./Inputs/RelationshipLevelSelector";
import HoqRequirementCell from "./HoqRequirementCell";
import NumericSelector from "./Inputs/NumericSelector";
import { controlCellStyling } from "./styles";

interface HoqRowsProps {
  qfdState: QfdState;
  setRequirementValue: (modifiedRowIndex: number, newValue: string) => void;
  setRelationshipValue: (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => void;
  addRequirementAt: (modifiedRowIndex: number) => void;
  setRequirementImportance: (modifiedRowIndex: number, newValue: number) => void;
  removeRequirementAt: (rowIndex: number) => void;
}

const HoqRows = ({
  qfdState,
  setRequirementValue,
  setRelationshipValue,
  addRequirementAt,
  setRequirementImportance,
  removeRequirementAt,
}: HoqRowsProps) => {
  return (
    <>
      {qfdState.relationshipValues.map((cellValues, rowIndex) => {
        return (
          <TableRow key={qfdState.requirements[rowIndex].id}>
            <HoqRequirementCell
              requirement={qfdState.requirements[rowIndex]}
              onChange={(newValue) => setRequirementValue(rowIndex, newValue)}
              onAddRequirement={() => addRequirementAt(rowIndex + 1)}
              onRemoveRequirement={() => removeRequirementAt(rowIndex)}
            />
            <TableCell sx={controlCellStyling}>
              <NumericSelector
                selectedValue={qfdState.requirements[rowIndex].importance}
                onChange={(newValue) => setRequirementImportance(rowIndex, newValue)}
              />
            </TableCell>
            {cellValues.map((value, colIndex) => {
              const id = qfdState.requirements[rowIndex].id + qfdState.measures[colIndex].id;
              return (
                <TableCell key={id} sx={controlCellStyling}>
                  <RelationshipLevelSelector
                    selectedValue={value}
                    onChange={(selectedValue) => setRelationshipValue(rowIndex, colIndex, selectedValue)}
                  />
                </TableCell>
              );
            })}
            {[...Array(5)].map((_, index) => (
              <TableCell key={index} sx={controlCellStyling}></TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};

export default HoqRows;
