import React, { useEffect } from "react";
import styles from "./Dialog.module.css";

type Props = {
  color: string;
  name: string;
  onClick: () => void;
};

const Dialog: React.FunctionComponent<Props> = ({
  color,
  name,
  onClick,
  children,
}) => {
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "Space") {
        onClick();
      }
    };
    window.addEventListener("keydown", keyListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [onClick]);
  return (
    <div className={styles.dialogBox} onClick={onClick}>
      <h3 style={{ color }}>{name}</h3>
      <p>{children}</p>
    </div>
  );
};

export default Dialog;
