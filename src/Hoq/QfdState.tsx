export interface QfdState {
  id: string;
  requirements: Requirement[];
  measures: Measure[];
  technicalCorrelations: number[][];
  relationshipValues: number[][];
}

export interface Requirement {
  id: string;
  name: string;
  importance: number;
}

export interface Measure {
  id: string;
  name: string;
  direction: number;
  complexity: number;
  unit: string;
}

// quickstart QFD template
export const generateInitialQfdState = (): QfdState => {
  return {
    id: crypto.randomUUID(),
    requirements: [
      {
        id: crypto.randomUUID(),
        name: "Requirement 1",
        importance: 1,
      },
      {
        id: crypto.randomUUID(),
        name: "Requirement 2",
        importance: 1,
      },
      {
        id: crypto.randomUUID(),
        name: "Requirement 3",
        importance: 1,
      },
      {
        id: crypto.randomUUID(),
        name: "Requirement 4",
        importance: 1,
      },
      {
        id: crypto.randomUUID(),
        name: "Requirement 5",
        importance: 1,
      },
    ],
    measures: [
      {
        id: crypto.randomUUID(),
        name: "Measure 1",
        direction: 0,
        complexity: 1,
        unit: "",
      },
      {
        id: crypto.randomUUID(),
        name: "Measure 2",
        direction: 0,
        complexity: 1,
        unit: "",
      },
      {
        id: crypto.randomUUID(),
        name: "Measure 3",
        direction: 0,
        complexity: 1,
        unit: "",
      },
      {
        id: crypto.randomUUID(),
        name: "Measure 4",
        direction: 0,
        complexity: 1,
        unit: "",
      },
      {
        id: crypto.randomUUID(),
        name: "Measure 5",
        direction: 0,
        complexity: 1,
        unit: "",
      },
    ],
    technicalCorrelations: [
      [0, 0, 0, 0],
      [0, 0, 0],
      [0, 0],
      [0],
    ],
    relationshipValues: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  };
};

export default QfdState;
