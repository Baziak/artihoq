import "./App.css";
import Hoq from "./Hoq/Hoq";
import { Container } from "@mui/material";
import AppMenuBar from "./AppMenuBar";
import useLocalStorage from "./Hoq/useLocalStorage";
import QfdState, { generateInitialQfdState } from "./Hoq/QfdState";
import { useRef, useState } from "react";
import SettingsDialog, { Settings, defaultSettings } from "./SettingsDialog";

// TODO list:
// - ctrl+z functionality
// - requirements groupping
// - limit requirements and measures
// - themes
// - make a common selector component

function App() {
  // TODO incapsulate this model into a class with a proper validation
  const [qfdState, setQfdState] = useLocalStorage<QfdState>("qfdState", generateInitialQfdState);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const contentRef = useRef<HTMLDivElement>(null);

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="App">
      <AppMenuBar qfdState={qfdState} setQfdState={setQfdState} contentRef={contentRef} setSettingsOpen={setSettingsOpen}/>
      <Container ref={contentRef}>
        <SettingsDialog open={settingsOpen} handleClose={() => setSettingsOpen(false)} settings={settings} setSettings={setSettings}/>
        <Hoq  qfdState={qfdState} setQfdState={setQfdState} settings={settings}/>
      </Container>
    </div>
  );
}

export default App;
