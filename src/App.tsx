import React, { useState, useCallback } from "react";
import SplashScreen from "./components/SplashScreen";
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

  if (gameState === "finished") {
    return <SplashScreen screen="end" />;
  }

  return <SplashScreen onKeyPress={onStart} screen="start" />;
};

export default App;
