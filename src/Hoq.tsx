import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import React from "react";
import useLocalStorage from "./useLocalStorage";
import QfdState, { InitialQfdState } from "./QfdState";
import HoqHead from "./HoqHead";
import HoqRows from "./HoqRows";

const Hoq = () => {
  // TODO incapsulate this model into a class with a proper validation
  const [qfdState, setQfdState] = useLocalStorage<QfdState>("qfdState", InitialQfdState);

  const setMeasureValue = (modifiedRowIndex: number, newValue: string) => {
    const measures = qfdState.measures.map((measure, index) =>
      modifiedRowIndex == index ? { ...measure, name: newValue } : measure
    );

    setQfdState({
      ...qfdState,
      measures,
    });
  };

  const addMeasureAt = (index: number) => {
    setQfdState({
      ...qfdState,
      measures: [
        ...qfdState.measures.slice(0, index),
        { id: crypto.randomUUID(), name: `Measure ${qfdState.measures.length + 1}`, direction: 0 },
        ...qfdState.measures.slice(index),
      ],
      relationshipValues: [
        ...qfdState.relationshipValues.map((row) => [...row.slice(0, index), 0, ...row.slice(index)]),
      ],
    });
  };

  const removeMeasureAt = (index: number) => {
    setQfdState({
      ...qfdState,
      measures: [...qfdState.measures.slice(0, index), ...qfdState.measures.slice(index + 1)],
      relationshipValues: qfdState.relationshipValues.map((row) => [...row.slice(0, index), ...row.slice(index + 1)]),
    });
  };


  const setRequirementValue = (modifiedRowIndex: number, newValue: string) => {
    const requirements = qfdState.requirements.map((requirement, index) =>
      modifiedRowIndex == index ? { ...requirement, name: newValue } : requirement
    );

    setQfdState({
      ...qfdState,
      requirements,
    });
  };

  const setRelationshipValue = (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => {
    const relationshipValues = qfdState.relationshipValues.map((row, rowIndex) =>
      modifiedRowIndex == rowIndex
        ? row.map((cellValue, colIndex) => (modifiedColIndex == colIndex ? newValue : cellValue))
        : row
    );

    setQfdState({
      ...qfdState,
      relationshipValues,
    });
  };

  const addRequirementAt = (index: number) => {
    const newRequirement = {
      id: crypto.randomUUID(),
      name: `Requirement ${qfdState.requirements.length + 1}`,
      importance: 0,
    };

    setQfdState({
      ...qfdState,
      requirements: [...qfdState.requirements.slice(0, index), newRequirement, ...qfdState.requirements.slice(index)],
      relationshipValues: [
        ...qfdState.relationshipValues.slice(0, index),
        Array(qfdState.measures.length).fill(0),
        ...qfdState.relationshipValues.slice(index),
      ],
    });
  };

  const removeRequirementAt = (index: number) => {
    setQfdState({
      ...qfdState,
      requirements: [...qfdState.requirements.slice(0, index), ...qfdState.requirements.slice(index + 1)],
      relationshipValues: [
        ...qfdState.relationshipValues.slice(0, index),
        ...qfdState.relationshipValues.slice(index + 1),
      ],
    });
  };

  return (
    <TableContainer
      sx={{
        width: "max-content",
      }}
    >
      <Table>
        <TableHead>
          <HoqHead qfdState={qfdState} setMeasureValue={setMeasureValue} addMeasureAt={addMeasureAt} removeMeasureAt={removeMeasureAt} />
        </TableHead>
        <TableBody>
          <HoqRows
            qfdState={qfdState}
            setRequirementValue={setRequirementValue}
            addRequirementAt={addRequirementAt}
            removeRequirementAt={removeRequirementAt}
            setRelationshipValue={setRelationshipValue}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Hoq;
