import React from "react";
import "./App.css";
import Level from "./components/Level";
import data from "./stage1";

function App() {
  return <Level data={data} />;
}

export default App;
