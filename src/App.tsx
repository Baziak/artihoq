import React, { useState } from 'react';
import './App.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import RelationshipLevelSelector from './RelationshipLevelSelector';
import { Theme } from '@mui/material/styles';
import RequirementInputField from './RequirementInputField';
import MeasureInputField from './MeasureInputField';

// TODO list:
// - local storage
// - ctrl+z functionality
// - export/import from json
// - requirements groupping

function App() {

  const cellStyling = {
    padding: 1,
    border: (theme: Theme) =>  `1px solid ${theme.palette.divider}`
  }

  const measuresCellStyling = {
    ...cellStyling,
    transform: 'rotate(180deg)',
    minHeight: 128,
    maxHeight: 256,
    writingMode: 'vertical-rl'
  }

  const requirementsCellStyling = {
    ...cellStyling,
    minWidth: 128,
    maxWidth: 256
  }

  const relationshipCellStyling = {
    ...cellStyling,
    padding: 0,
    width: 24,
    textAlign: 'center'
  }
  
  
  // TODO incapsulate this model into a class with a proper validation
  const [qfdData, setQfdData] = useState({
    requirements: [
      {
        name: 'Requirement 1',
        importance: 0
      },
      {
        name: 'Requirement 2',
        importance: 0
      },
      {
        name: 'Requirement 3',
        importance: 0
      },
      {
        name: 'Requirement 4',
        importance: 0
      },
      {
        name: 'Requirement 5',
        importance: 0
      }
    ],
    measures: [
      {
        name: 'Measure 1',
        direction: 0
      },
      {
        name: 'Measure 2',
        direction: 0
      },
      {
        name: 'Measure 3',
        direction: 0
      },
      {
        name: 'Measure 4',
        direction: 0
      },
      {
        name: 'Measure 5',
        direction: 0
      }
    ],
    relationshipValues: [
      [0, 3, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [2, 0, 2, 1, 0],
      [1, 2, 3, 1, 0],
      [0, 3, 1, 0, 2]
    ]
  });

  const  setMeasureValue = (modifiedRowIndex: number, newValue: string) => {
    const measures = qfdData.measures.map(
      (measure, index) => modifiedRowIndex == index ? {...measure, name: newValue} : measure);

    setQfdData({
      ...qfdData,
      measures
    });
  };

  const setRelationshipValue = (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => {
    const relationshipValues = qfdData.relationshipValues.map(
      (row, rowIndex) => modifiedRowIndex == rowIndex ? row.map(
        (cellValue, colIndex) => modifiedColIndex == colIndex ? newValue : cellValue
      ) : row);

    
    setQfdData({
      ...qfdData,
      relationshipValues
    });
  };

  const head = <TableRow>
    <TableCell colSpan={2}></TableCell>
    {qfdData.measures.map((measure, index) => 
      <TableCell sx={measuresCellStyling}>
        <MeasureInputField value={measure.name} onChange={(newValue) => setMeasureValue(index, newValue)} />
      </TableCell>
    )}
  </TableRow>

  let rows: any[] = qfdData.relationshipValues.map((cellValues, rowIndex) => {
    let cells: any[] = cellValues.map((value, colIndex) => {

      return <TableCell sx={{ ...relationshipCellStyling }}>
        <RelationshipLevelSelector 
          selectedValue={value} 
          onChange={(selectedValue) => setRelationshipValue(rowIndex, colIndex, selectedValue)} />
      </TableCell>
    })
    return <TableRow>
      <TableCell sx={{ ...requirementsCellStyling }}>
        <RequirementInputField value={qfdData.requirements[rowIndex].name} />
      </TableCell>
      <TableCell sx={{ ...cellStyling }}></TableCell>
      {cells}
    </TableRow>;
  });

  return (
    <div className="App">
      <TableContainer sx={{
        width: "max-content"
      }}>
        <Table>
          <TableHead>
            {head}
          </TableHead>
          <TableBody>
              {rows}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
