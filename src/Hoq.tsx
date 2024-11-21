import { Table, TableBody, TableContainer, TableHead } from '@mui/material';
import React from 'react';
import useLocalStorage from './useLocalStorage';
import QfdState, { InitialQfdState } from './QfdState';
import HoqHead from './HoqHead';
import HoqRows from './HoqRows';

const Hoq = () => {

  // TODO incapsulate this model into a class with a proper validation
  const [qfdState, setQfdState] = useLocalStorage<QfdState>("qfdState", InitialQfdState);

  const setMeasureValue = (modifiedRowIndex: number, newValue: string) => {
    const measures = qfdState.measures.map(
      (measure, index) => modifiedRowIndex == index ? {...measure, name: newValue} : measure);

    setQfdState({
      ...qfdState,
      measures
    });
  };

  const setRequirementValue = (modifiedRowIndex: number, newValue: string) => {
    const requirements = qfdState.requirements.map(
      (requirement, index) => modifiedRowIndex == index ? {...requirement, name: newValue} : requirement);

    setQfdState({
      ...qfdState,
      requirements
    });
  };

  const setRelationshipValue = (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => {
    const relationshipValues = qfdState.relationshipValues.map(
      (row, rowIndex) => modifiedRowIndex == rowIndex ? row.map(
        (cellValue, colIndex) => modifiedColIndex == colIndex ? newValue : cellValue
      ) : row);

    
    setQfdState({
      ...qfdState,
      relationshipValues
    });
  };

  return (
    <TableContainer sx={{
      width: "max-content"
    }}>
      <Table>
        <TableHead>
          <HoqHead qfdState={qfdState} setMeasureValue={setMeasureValue} />
        </TableHead>
        <TableBody>
          <HoqRows 
            qfdState={qfdState} 
            setRequirementValue={setRequirementValue} 
            setRelationshipValue={setRelationshipValue} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Hoq;
