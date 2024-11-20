import './App.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import RelationshipLevelSelector from './RelationshipLevelSelector';
import { Theme } from '@mui/material/styles';
import RequirementInputField from './RequirementInputField';
import MeasureInputField from './MeasureInputField';
import {InitialQfdState , QfdState} from './QfdState';
import useLocalStorage from './useLocalStorage';

// TODO list:
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

  const head = <TableRow>
    <TableCell colSpan={2}></TableCell>
    {qfdState.measures.map((measure, index) => 
      <TableCell key={qfdState.measures[index].id} sx={measuresCellStyling}>
        <MeasureInputField value={measure.name} onChange={(newValue) => setMeasureValue(index, newValue)} />
      </TableCell>
    )}
  </TableRow>

  let rows: any[] = qfdState.relationshipValues.map((cellValues, rowIndex) => {
    let cells: any[] = cellValues.map((value, colIndex) => {

      const id = qfdState.requirements[rowIndex].id + qfdState.measures[colIndex].id

      return <TableCell key={id} sx={{ ...relationshipCellStyling }}>
        <RelationshipLevelSelector 
          selectedValue={value} 
          onChange={(selectedValue) => setRelationshipValue(rowIndex, colIndex, selectedValue)} />
      </TableCell>
    })
    return <TableRow key={qfdState.requirements[rowIndex].id}>
      <TableCell sx={{ ...requirementsCellStyling }}>
        <RequirementInputField 
          value={qfdState.requirements[rowIndex].name} 
          onChange={(newValue) => setRequirementValue(rowIndex, newValue)} />
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
