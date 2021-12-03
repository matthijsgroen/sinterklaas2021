import React, { useEffect } from "react";
import styles from "./SplashScreen.module.css";

type Props = {
  onKeyPress?: () => void;
  screen: "start" | "intro" | "end";
};

const SplashScreen: React.FunctionComponent<Props> = ({
  onKeyPress,
  screen,
}) => {
  useEffect(() => {
    if (!onKeyPress) return;
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "Space") {
        onKeyPress();
      }
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [onKeyPress]);
  return (
    <div
      className={
        screen === "start"
          ? styles.startScreen
          : screen === "intro"
          ? styles.introScreen
          : styles.endScreen
      }
    />
  );
};

export default SplashScreen;
