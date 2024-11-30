import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import React from "react";
import QfdState from "./QfdState";
import HoqHead from "./HoqHead";
import HoqRows from "./HoqRows";

interface HoqProps {
  qfdState: QfdState;
  setQfdState: Function;
}

const Hoq = ({ qfdState, setQfdState }: HoqProps) => {
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
    // insert correlation diagonal row for the new item
    const technicalCorrelations = [
      ...qfdState.technicalCorrelations.slice(0, index),
      Array(qfdState.measures.length - index).fill(0),
      ...qfdState.technicalCorrelations.slice(index),
    ].map((row, rowIndex) =>
      // insert correlation diagonal column before the inserted item
      rowIndex >= index ? row : [...row.slice(0, index - rowIndex - 1), 0, ...row.slice(index - rowIndex - 1)]
    );

    setQfdState({
      ...qfdState,
      measures: [
        ...qfdState.measures.slice(0, index),
        { id: crypto.randomUUID(), name: `Measure ${qfdState.measures.length + 1}`, direction: 0 },
        ...qfdState.measures.slice(index),
      ],
      technicalCorrelations,
      relationshipValues: [
        ...qfdState.relationshipValues.map((row) => [...row.slice(0, index), 0, ...row.slice(index)]),
      ],
    });
  };

  const removeMeasureAt = (index: number) => {
    // remove correlation diagonal row for the new item
    const technicalCorrelations = [
      ...qfdState.technicalCorrelations.slice(0, index),
      ...qfdState.technicalCorrelations.slice(index + 1),
    ].map((row, rowIndex) =>
      // remove correlation diagonal column before the inserted item
      rowIndex >= index ? row : [...row.slice(0, index - rowIndex - 1), ...row.slice(index - rowIndex)]
    );

    setQfdState({
      ...qfdState,
      measures: [...qfdState.measures.slice(0, index), ...qfdState.measures.slice(index + 1)],
      technicalCorrelations,
      relationshipValues: qfdState.relationshipValues.map((row) => [...row.slice(0, index), ...row.slice(index + 1)]),
    });
  };

  const setMeasureDirection = (modifiedItemIndex: number, newValue: number) => {
    const measures = qfdState.measures.map((measure, index) =>
      index === modifiedItemIndex ? { ...measure, direction: newValue } : measure
    );

    setQfdState({ ...qfdState, measures });
  };

  const setTechnicalCorrelationValue = (modifiedRowIndex: number, modifiedColIndex: number, newValue: number) => {
    const technicalCorrelations = qfdState.technicalCorrelations.map((row, rowIndex) =>
      row.map((cellValue, colIndex) =>
        modifiedRowIndex === rowIndex && modifiedColIndex === colIndex ? newValue : cellValue
      )
    );

    setQfdState({ ...qfdState, technicalCorrelations });
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

  const setRequirementImportance = (modifiedRowIndex: number, newValue: number) => {
    const requirements = qfdState.requirements.map((requirement, index) =>
      modifiedRowIndex === index ? { ...requirement, importance: newValue } : requirement
    );

    setQfdState({ ...qfdState, requirements });
  };

  return (
    <TableContainer
      sx={{
        width: "max-content",
      }}
    >
      <Table>
        <TableHead>
          <HoqHead
            qfdState={qfdState}
            setMeasureValue={setMeasureValue}
            addMeasureAt={addMeasureAt}
            removeMeasureAt={removeMeasureAt}
            setMeasureDirection={setMeasureDirection}
            setTechnicalCorrelationValue={setTechnicalCorrelationValue}
          />
        </TableHead>
        <TableBody>
          <HoqRows
            qfdState={qfdState}
            setRequirementValue={setRequirementValue}
            addRequirementAt={addRequirementAt}
            removeRequirementAt={removeRequirementAt}
            setRequirementImportance={setRequirementImportance}
            setRelationshipValue={setRelationshipValue}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Hoq;
