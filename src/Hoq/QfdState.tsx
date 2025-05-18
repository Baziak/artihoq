export interface QfdState {
  requirements: Requirement[];
  measures: Measure[];
  competitors: Competitor[];
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

export interface Competitor {
  id: string;
  name: string;
}

// quickstart QFD template
export const generateInitialQfdState = (): QfdState => {
  return {
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
    competitors: [
      {
        id: crypto.randomUUID(),
        name: "Competitor 1",
      },
      {
        id: crypto.randomUUID(),
        name: "Competitor 2",
      },
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
