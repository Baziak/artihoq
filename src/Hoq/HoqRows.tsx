import React from "react";
import { TableCell, TableRow } from "@mui/material";
import QfdState from "./QfdState";
import RelationshipLevelSelector from "./Inputs/RelationshipLevelSelector";
import HoqRequirementCell from "./HoqRequirementCell";
import { baseColor, controlCellStyling, focusColor, highlightColor } from "./styles";
import { Settings } from "../SettingsDialog";
import NumericTextField from "./Inputs/NumericTextField";
import NumericSelector from "./Inputs/NumericSelector";

interface HoqRowsProps {
  qfdState: QfdState;
  setRequirementValue: (modifiedRowIndex: number, newValue: string) => void;
  setRelationshipValue: (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => void;
  addRequirementAt: (modifiedRowIndex: number) => void;
  setRequirementImportance: (modifiedRowIndex: number, newValue: number) => void;
  removeRequirementAt: (rowIndex: number) => void;
  settings: Settings;
}

const HoqRows = ({
  qfdState,
  setRequirementValue,
  setRelationshipValue,
  addRequirementAt,
  setRequirementImportance,
  removeRequirementAt,
  settings,
}: HoqRowsProps) => {
  const RelationshipLevelControl = ({ initialValue, onChange }: { initialValue: number; onChange: (newValue: number) => void }) => {
    if (settings.relationshipLevelControl === "input") {
      return <NumericTextField value={initialValue} onChange={onChange} />;
    } else {
      return <RelationshipLevelSelector selectedValue={initialValue} onChange={onChange} />;
    }
  };

  const ImportanceControl = ({ initialValue, onChange }: { initialValue: number; onChange: (newValue: number) => void }) => {
    if (settings.importanceLevelControl === "input") {
      return <NumericTextField value={initialValue} onChange={onChange} />;
    } else {
      return <NumericSelector selectedValue={initialValue} onChange={onChange} maxValue={settings.importanceMaxValue} />;
    }
  };

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
            <TableCell sx={{ ...controlCellStyling, ...baseColor }}>
              <ImportanceControl
                initialValue={qfdState.requirements[rowIndex].importance}
                onChange={(newValue) => setRequirementImportance(rowIndex, newValue)}
              />
            </TableCell>
            {cellValues.map((value, colIndex) => {
              const id = qfdState.requirements[rowIndex].id + qfdState.measures[colIndex].id;
              return (
                <TableCell key={id} sx={{ ...controlCellStyling, ...focusColor }}>
                  <RelationshipLevelControl
                    initialValue={value}
                    onChange={(selectedValue) => setRelationshipValue(rowIndex, colIndex, selectedValue)}
                  />
                </TableCell>
              );
            })}
            {[...Array(5)].map((_, index) => (
              <TableCell key={index} sx={{ ...controlCellStyling, ...highlightColor }}></TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};

export default HoqRows;
