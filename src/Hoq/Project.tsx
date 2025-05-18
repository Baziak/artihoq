import QfdState, { generateInitialQfdState } from "./QfdState";
import { Settings, defaultSettings } from "../SettingsDialog";

export interface Project {
  version: number;
  id: string;
  qfdState: QfdState;
  settings: Settings;
}

export class ProjectImpl implements Project {
  version: number;
  id: string;
  qfdState: QfdState;
  settings: Settings;

  constructor(partialProject: Partial<Project> = {}) {
    // TODO move initial data generation to some factory and let ProjectImpl be a clean class
    const initialQfdState = generateInitialQfdState();
    this.version = partialProject.version ?? 1;
    this.id = partialProject.id ?? crypto.randomUUID();
    this.qfdState = {
      ...initialQfdState,
      ...Object.fromEntries( // filter out redudant fields
        Object.entries(partialProject.qfdState || {}).filter(([key]) => key in initialQfdState)
      ),
    };
    this.settings = {
      ...defaultSettings,
      ...Object.fromEntries( // filter out redudant fields
        Object.entries(partialProject.settings || {}).filter(([key]) => key in defaultSettings)
      ),
    };
  }
}

export const generateInitialProject = (): Project => {
  return new ProjectImpl();
};

export default Project;
