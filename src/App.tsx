import React from "react";
import "./App.css";
import Level from "./components/Level";
import data from "./stage1";

function App() {
  return <Level data={data} position={data.startPosition} direction="north" />;
}

export default App;
