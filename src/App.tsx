import "./App.css";
import Hoq from "./Hoq/Hoq";
import { Container } from "@mui/material";
import AppMenuBar from "./AppMenuBar";
import useLocalStorage from "./Hoq/useLocalStorage";
import Project, { generateInitialProject } from "./Hoq/Project";
import { useRef, useState, SetStateAction, Dispatch } from "react";
import SettingsDialog, { Settings } from "./SettingsDialog";
import QfdState from "./Hoq/QfdState";
import { NotificationProvider } from "./NotificationContext";
import GlobalSnackbar from "./GlobalSnackbar";

// TODO list:
// - ctrl+z functionality
// - requirements groupping
// - limit requirements and measures
// - themes
// - make a common selector component

function App() {
  const [project, setProject] = useLocalStorage<Project>("project", generateInitialProject);
  const contentRef = useRef<HTMLDivElement>(null);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const setQfdState: Dispatch<SetStateAction<QfdState>> = (newQfdState) => {
    setProject((prevProject) => ({
      ...prevProject,
      qfdState: typeof newQfdState === "function" ? newQfdState(prevProject.qfdState) : newQfdState,
    }));
  };

  const setSettings = (newSettings: SetStateAction<Settings>) =>
    setProject((prevProject) => ({
      ...prevProject,
      settings: typeof newSettings === "function" ? newSettings(prevProject.settings) : newSettings,
    }));

  return (
    <NotificationProvider>
      <div className="App">
        <AppMenuBar
          project={project}
          setProject={setProject}
          contentRef={contentRef}
          setSettingsOpen={setSettingsOpen}
        />
        <Container ref={contentRef}>
          <SettingsDialog
            open={settingsOpen}
            handleClose={() => setSettingsOpen(false)}
            settings={project.settings}
            setSettings={setSettings}
          />
          <Hoq
            qfdState={project.qfdState}
            setQfdState={setQfdState}
            settings={project.settings}
          />
        </Container>
        <GlobalSnackbar />
      </div>
    </NotificationProvider>
  );
}

export default App;
