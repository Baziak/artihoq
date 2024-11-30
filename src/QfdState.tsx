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
}

// quickstart QFD template
export const generateInitialQfdState = (): QfdState => {
  return {
    id: crypto.randomUUID(),
    requirements: [
      {
        id: crypto.randomUUID(),
        name: "Requirement 1",
        importance: 0,
      },
      {
        id: crypto.randomUUID(),
        name: "Requirement 2",
        importance: 0,
      },
      {
        id: crypto.randomUUID(),
        name: "Requirement 3",
        importance: 0,
      },
      {
        id: crypto.randomUUID(),
        name: "Requirement 4",
        importance: 0,
      },
      {
        id: crypto.randomUUID(),
        name: "Requirement 5",
        importance: 0,
      },
    ],
    measures: [
      {
        id: crypto.randomUUID(),
        name: "Measure 1",
        direction: 0,
      },
      {
        id: crypto.randomUUID(),
        name: "Measure 2",
        direction: 0,
      },
      {
        id: crypto.randomUUID(),
        name: "Measure 3",
        direction: 0,
      },
      {
        id: crypto.randomUUID(),
        name: "Measure 4",
        direction: 0,
      },
      {
        id: crypto.randomUUID(),
        name: "Measure 5",
        direction: 0,
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
