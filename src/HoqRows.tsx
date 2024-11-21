import React from 'react';
import { TableCell, TableRow, Theme } from '@mui/material';
import QfdState from './QfdState';
import RelationshipLevelSelector from './RelationshipLevelSelector';
import RequirementInputField from './RequirementInputField';

const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
};

const requirementsCellStyling = {
  ...cellStyling,
  minWidth: 128,
  maxWidth: 256,
};

const relationshipCellStyling = {
  ...cellStyling,
  padding: 0,
  width: 24,
  textAlign: 'center',
};

interface HoqRowsProps {
  qfdState: QfdState;
  setRequirementValue: (modifiedRowIndex: number, newValue: string) => void;
  setRelationshipValue: (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => void;
}

const HoqRows = ({ qfdState, setRequirementValue, setRelationshipValue }: HoqRowsProps) => {
  return <>{qfdState.relationshipValues.map((cellValues, rowIndex) => {
    return (
      <TableRow key={qfdState.requirements[rowIndex].id}>
        <TableCell sx={requirementsCellStyling}>
          <RequirementInputField
            value={qfdState.requirements[rowIndex].name}
            onChange={(newValue) => setRequirementValue(rowIndex, newValue)}
          />
        </TableCell>
        <TableCell sx={cellStyling}></TableCell>
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
      </TableRow>
    );
  })}</>;
};

export default HoqRows;
