import "./App.css";
import Hoq from "./Hoq";
import { Container } from "@mui/material";
import AppMenuBar from "./AppMenuBar";

// TODO list:
// - ctrl+z functionality
// - export/import from json
// - requirements groupping
// - limit requirements and measures
// - themes
// - make a common selector component

function App() {
  return (
    <div className="App">
      <AppMenuBar />
      <Container>
        <Hoq />
      </Container>
    </div>
  );
}

export default App;
