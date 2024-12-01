import React from "react";
import { Popper, TableCell, TableRow, Theme } from "@mui/material";
import QfdState from "./QfdState";
import RelationshipLevelSelector from "./Inputs/RelationshipLevelSelector";
import RequirementInputField from "./Inputs/RequirementInputField";
import HoqRequirementCell from "./HoqRequirementCell";
import { AddReaction } from "@mui/icons-material";
import UserImportanceSelector from "./Inputs/UserImportanceSelector";

const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
};

const relationshipCellStyling = {
  ...cellStyling,
  padding: 0,
  width: 24,
  textAlign: "center",
};

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
            <TableCell sx={cellStyling}>
              <UserImportanceSelector
                selectedValue={qfdState.requirements[rowIndex].importance}
                onChange={(newValue) => setRequirementImportance(rowIndex, newValue)}
              />
            </TableCell>
            {cellValues.map((value, colIndex) => {
              const id = qfdState.requirements[rowIndex].id + qfdState.measures[colIndex].id;
              return (
                <TableCell key={id} sx={relationshipCellStyling}>
                  <RelationshipLevelSelector
                    selectedValue={value}
                    onChange={(selectedValue) => setRelationshipValue(rowIndex, colIndex, selectedValue)}
                  />
                </TableCell>
              );
            })}
            {[...Array(5)].map((_, index) => (
              <TableCell key={index} sx={cellStyling}></TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};

export default HoqRows;
