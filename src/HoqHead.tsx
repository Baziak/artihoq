import React from 'react';
import { TableCell, TableRow, Theme } from '@mui/material';
import QfdState from './QfdState';
import MeasureInputField from './MeasureInputField';

const cellStyling = {
  padding: 1,
  border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
};

const measuresCellStyling = {
  ...cellStyling,
  transform: 'rotate(180deg)',
  minHeight: 128,
  maxHeight: 256,
  writingMode: 'vertical-rl',
};

const HoqHead = ({ qfdState, setMeasureValue }: { qfdState: QfdState; setMeasureValue: (modifiedRowIndex: number, newValue: string) => void }) => {
  return (
    <TableRow>
      <TableCell colSpan={2}></TableCell>
      {qfdState.measures.map((measure, index) => (
        <TableCell key={qfdState.measures[index].id} sx={measuresCellStyling}>
          <MeasureInputField value={measure.name} onChange={(newValue) => setMeasureValue(index, newValue)} />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default HoqHead;
