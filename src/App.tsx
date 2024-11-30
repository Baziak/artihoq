import "./App.css";
import Hoq from "./Hoq";
import { Container } from "@mui/material";
import AppMenuBar from "./AppMenuBar";
import useLocalStorage from "./useLocalStorage";
import QfdState, { generateInitialQfdState } from "./QfdState";

// TODO list:
// - ctrl+z functionality
// - export/import from json
// - requirements groupping
// - limit requirements and measures
// - themes
// - make a common selector component

function App() {
  // TODO incapsulate this model into a class with a proper validation
  const [qfdState, setQfdState] = useLocalStorage<QfdState>("qfdState", generateInitialQfdState);

  return (
    <div className="App">
      <AppMenuBar qfdState={qfdState} setQfdState={setQfdState}  />
      <Container>
        <Hoq qfdState={qfdState} setQfdState={setQfdState} />
      </Container>
    </div>
  );
}

export default App;
