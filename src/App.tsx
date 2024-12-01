import "./App.css";
import Hoq from "./Hoq/Hoq";
import { Container } from "@mui/material";
import AppMenuBar from "./AppMenuBar";
import useLocalStorage from "./Hoq/useLocalStorage";
import QfdState, { generateInitialQfdState } from "./Hoq/QfdState";
import { useRef } from "react";

// TODO list:
// - ctrl+z functionality
// - requirements groupping
// - limit requirements and measures
// - themes
// - make a common selector component

function App() {
  // TODO incapsulate this model into a class with a proper validation
  const [qfdState, setQfdState] = useLocalStorage<QfdState>("qfdState", generateInitialQfdState);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <AppMenuBar qfdState={qfdState} setQfdState={setQfdState} contentRef={contentRef} />
      <Container ref={contentRef}>
        <Hoq  qfdState={qfdState} setQfdState={setQfdState} />
      </Container>
    </div>
  );
}

export default App;
