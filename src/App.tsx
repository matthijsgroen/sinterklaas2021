import React, { useState, useCallback } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./Game";

type GameState = "init" | "started" | "finished";

const App: React.FunctionComponent = () => {
  const [gameState, setGameState] = useState<GameState>("init");

  const onComplete = useCallback(() => {
    setGameState("finished");
  }, []);

  const onStart = useCallback(() => {
    setGameState("started");
  }, []);

  if (gameState === "started") {
    return <Game onComplete={onComplete} />;
  }

  return <StartScreen onStart={onStart} />;
};

export default App;
