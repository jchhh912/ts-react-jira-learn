import React from "react";
import "./App.css";
import { ProjectListScreerns } from "screens/project-list";
import { TsReactTese } from "utils/try-use-array";

function App() {
  return (
    <div className="App">
      <TsReactTese />
      <ProjectListScreerns />
    </div>
  );
}

export default App;
