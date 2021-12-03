import React, { useState, useCallback } from "react";
import SplashScreen from "./components/SplashScreen";
import Game from "./Game";

type GameState = "init" | "intro" | "started" | "finished";

const App: React.FunctionComponent = () => {
  const [gameState, setGameState] = useState<GameState>("init");

  const onComplete = useCallback(() => {
    setGameState("finished");
  }, []);

  const onStart = useCallback(() => {
    setGameState("started");
  }, []);

  const onIntro = useCallback(() => {
    setGameState("intro");
  }, []);

  if (gameState === "started") {
    return <Game onComplete={onComplete} />;
  }

  if (gameState === "intro") {
    return <SplashScreen screen="intro" onKeyPress={onStart} />;
  }

  if (gameState === "finished") {
    return <SplashScreen screen="end" />;
  }

  return <SplashScreen onKeyPress={onIntro} screen="start" />;
};

export default App;
