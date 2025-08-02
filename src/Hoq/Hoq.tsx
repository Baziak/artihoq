import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import QfdState from "./QfdState";
import HoqHead from "./HoqHead";
import HoqRows from "./HoqRows";
import HoqImplementationComplexityRow from "./HoqImplementationComplexityRow";
import HoqUnitsAndValuesRow from "./HoqUnitsAndValuesRow";
import HoqTechBenchmarkRows from "./HoqTechBenchmarkRows";
import HoqImportanceRows from "./HoqImportanceRows";
import { Settings } from "../SettingsDialog";

interface HoqProps {
  qfdState: QfdState;
  setQfdState: Function;
  settings: Settings;
}

const Hoq = ({ qfdState, setQfdState, settings }: HoqProps) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [baseline, setBaseline] = useState<React.ReactNode>(null);
 
  const calculateBaseline = useCallback(() => {
    if (!tableContainerRef.current) {
      return;
    }
 
    const competitor1Ratings = qfdState.requirementCompetitorRatings.map((row) => row?.[0] || 0);
    const points: { x: number; y: number; rowIndex: number }[] = [];
 
    competitor1Ratings.forEach((rating, index) => {
      if (rating > 0) {
        const cell = tableContainerRef.current?.querySelector(`#rating-cell-${index}-${rating}`);
        if (cell instanceof HTMLElement) {
          points.push({
            x: cell.offsetLeft + cell.clientWidth / 2,
            y: cell.offsetTop + cell.clientHeight / 2,
            rowIndex: index,
          });
        }
      }
    });
 
    const lineSegments: React.ReactNode[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      // Only connect adjacent rows
      if (p2.rowIndex === p1.rowIndex + 1) {
        lineSegments.push(
          <line key={`line-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="black" strokeWidth="1.5" />
        );
      }
    }
 
    if (lineSegments.length > 0) {
      setBaseline(<g>{lineSegments}</g>);
    } else {
      setBaseline(null);
    }
  }, [qfdState.requirementCompetitorRatings]);
 
  useEffect(() => {
    calculateBaseline();
    const container = tableContainerRef.current;
    if (!container) return;
 
    const resizeObserver = new ResizeObserver(calculateBaseline);
    resizeObserver.observe(container);
 
    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateBaseline]);

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
        {
          id: crypto.randomUUID(),
          name: `Measure ${qfdState.measures.length + 1}`,
          direction: 0,
          complexity: 1,
          unit: "",
        },
        ...qfdState.measures.slice(index),
      ],
      technicalCorrelations,
      relationshipValues: [
        ...qfdState.relationshipValues.map((row) => [...row.slice(0, index), 0, ...row.slice(index)]),
      ],
      technicalBenchmarkRatings: [
        ...qfdState.technicalBenchmarkRatings.slice(0, index),
        Array(qfdState.competitors.length).fill(0),
        ...qfdState.technicalBenchmarkRatings.slice(index),
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
      technicalBenchmarkRatings: [
        ...qfdState.technicalBenchmarkRatings.slice(0, index),
        ...qfdState.technicalBenchmarkRatings.slice(index + 1),
      ],
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
      importance: 1,
    };
    const newRequirementCompetitorRatingsRow = Array(qfdState.competitors.length).fill(0);

    setQfdState({
      ...qfdState,
      requirements: [...qfdState.requirements.slice(0, index), newRequirement, ...qfdState.requirements.slice(index)],
      relationshipValues: [
        ...qfdState.relationshipValues.slice(0, index),
        Array(qfdState.measures.length).fill(0),
        ...qfdState.relationshipValues.slice(index),
      ],
      requirementCompetitorRatings: [
        ...qfdState.requirementCompetitorRatings.slice(0, index),
        newRequirementCompetitorRatingsRow,
        ...qfdState.requirementCompetitorRatings.slice(index),
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
      requirementCompetitorRatings: [
        ...qfdState.requirementCompetitorRatings.slice(0, index),
        ...qfdState.requirementCompetitorRatings.slice(index + 1),
      ],
    });
  };

  const setRequirementImportance = (modifiedRowIndex: number, newValue: number) => {
    const requirements = qfdState.requirements.map((requirement, index) =>
      modifiedRowIndex === index ? { ...requirement, importance: newValue } : requirement
    );

    setQfdState({ ...qfdState, requirements });
  };

  const setMeasureImplementationComplexity = (modifiedItemIndex: number, newValue: number) => {
    const measures = qfdState.measures.map((measure, index) =>
      index === modifiedItemIndex ? { ...measure, complexity: newValue } : measure
    );

    setQfdState({ ...qfdState, measures });
  };

  const setMeasureUnit = (modifiedItemIndex: number, newValue: string) => {
    const measures = qfdState.measures.map((measure, index) =>
      index === modifiedItemIndex ? { ...measure, unit: newValue } : measure
    );

    setQfdState({ ...qfdState, measures });
  };

  const setCompetitorValue = (modifiedRowIndex: number, newValue: string) => {
    const competitors = qfdState.competitors.map((competitor, index) =>
      modifiedRowIndex == index ? { ...competitor, name: newValue } : competitor
    );

    setQfdState({
      ...qfdState,
      competitors,
    });
  };

  const addCompetitorAt = (index: number) => {
    const newCompetitor = {
      id: crypto.randomUUID(),
      name: `Competitor ${qfdState.competitors.length + 1}`,
    };
    const updatedRequirementCompetitorRatings = qfdState.requirementCompetitorRatings.map(row => [
      ...row.slice(0, index),
      0,
      ...row.slice(index)
    ]);

    setQfdState({
      ...qfdState,
      competitors: [
        ...qfdState.competitors.slice(0, index),
        newCompetitor,
        ...qfdState.competitors.slice(index),
      ],
      requirementCompetitorRatings: updatedRequirementCompetitorRatings,
      technicalBenchmarkRatings: qfdState.technicalBenchmarkRatings.map((row) => [
        ...row.slice(0, index),
        0,
        ...row.slice(index),
      ]),
    });
  };

  const removeCompetitorAt = (index: number) => {
    setQfdState({
      ...qfdState,
      competitors: [
        ...qfdState.competitors.slice(0, index),
        ...qfdState.competitors.slice(index + 1),
      ],
      requirementCompetitorRatings: qfdState.requirementCompetitorRatings.map(row => [
        ...row.slice(0, index),
        ...row.slice(index + 1)
      ]),
      technicalBenchmarkRatings: qfdState.technicalBenchmarkRatings.map((row) => [
        ...row.slice(0, index),
        ...row.slice(index + 1),
      ]),
    });
  };

  const setRequirementCompetitorRating = (requirementIndex: number, competitorIndex: number, rating: number) => {
    const newRatings = qfdState.requirementCompetitorRatings.map((row, rIndex) => {
      if (rIndex === requirementIndex) {
        const updatedRow = [...row];

        if (rating !== 0 && !settings.allowSameCompetitorRatings) {
          const currentRatingOfCompetitor = updatedRow[competitorIndex];
          const otherCompetitorIndex = updatedRow.findIndex(
            (r, i) => r === rating && i !== competitorIndex
          );

          if (otherCompetitorIndex !== -1) {
            // Another competitor has the new rating. Swap ratings.
            updatedRow[otherCompetitorIndex] = currentRatingOfCompetitor;
          }
        }

        updatedRow[competitorIndex] = rating;
        return updatedRow;
      }
      return row;
    });
    setQfdState({ ...qfdState, requirementCompetitorRatings: newRatings });
  };

  const setTechnicalBenchmarkRating = (measureIndex: number, competitorIndex: number, rating: number) => {
    const newRatings = qfdState.technicalBenchmarkRatings.map((row, mIndex) => {
      if (mIndex === measureIndex) {
        const updatedRow = [...row];

        if (rating !== 0 && !settings.allowSameCompetitorMeasureMark) {
          const currentRatingOfCompetitor = updatedRow[competitorIndex];
          const otherCompetitorIndex = updatedRow.findIndex(
            (r, i) => r === rating && i !== competitorIndex
          );

          if (otherCompetitorIndex !== -1) {
            // Another competitor has the new rating. Swap ratings.
            updatedRow[otherCompetitorIndex] = currentRatingOfCompetitor;
          }
        }

        updatedRow[competitorIndex] = rating;
        return updatedRow;
      }
      return row;
    });
    setQfdState({ ...qfdState, technicalBenchmarkRatings: newRatings });
  };

  return (
    <TableContainer
      sx={{
        position: "relative",
        width: "max-content",
        margin: "1em 0",
      }}
      ref={tableContainerRef}
    >
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {baseline}
      </svg>
      <Table>
        <TableHead>
          <HoqHead
            qfdState={qfdState}
            setMeasureValue={setMeasureValue}
            addMeasureAt={addMeasureAt}
            removeMeasureAt={removeMeasureAt}
            setMeasureDirection={setMeasureDirection}
            setTechnicalCorrelationValue={setTechnicalCorrelationValue}
            settings={settings}
            setCompetitorValue={setCompetitorValue}
            addCompetitorAt={addCompetitorAt}
            removeCompetitorAt={removeCompetitorAt}
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
            settings={settings}
            setRequirementCompetitorRating={setRequirementCompetitorRating}
          />
          <HoqImplementationComplexityRow
            qfdState={qfdState}
            setMeasureImplementationComplexity={setMeasureImplementationComplexity}
            settings={settings}
          />
          <HoqUnitsAndValuesRow qfdState={qfdState} setMeasureUnit={setMeasureUnit} />
          <HoqTechBenchmarkRows qfdState={qfdState} setTechnicalBenchmarkRating={setTechnicalBenchmarkRating} />
          <HoqImportanceRows qfdState={qfdState} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Hoq;
