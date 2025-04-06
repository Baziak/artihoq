import QfdState, { generateInitialQfdState } from "./QfdState";
import { Settings, defaultSettings } from "../SettingsDialog";

export interface Project {
  version: number;
  id: string;
  qfdState: QfdState;
  settings: Settings;
}

export const generateInitialProject = (): Project => {
  return {
    version: 1,
    id: crypto.randomUUID(),
    qfdState: generateInitialQfdState(),
    settings: defaultSettings,
  };
};

export default Project;
