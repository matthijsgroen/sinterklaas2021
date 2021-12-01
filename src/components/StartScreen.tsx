import React, { useEffect } from "react";
import styles from "./StartScreen.module.css";

type Props = {
  onStart: () => void;
};

const StartScreen: React.FunctionComponent<Props> = ({ onStart }) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "Space") {
        onStart();
      }
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [onStart]);
  return <div className={styles.startScreen} />;
};

export default StartScreen;
