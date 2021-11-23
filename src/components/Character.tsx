import React from "react";
import { Position } from "../types";
import styles from "./Character.module.css";

type Props = {
  position: Position;
  index?: number;
  size?: "normal" | "small";
};

const calculatePosition = (
  position: Position,
  size: "normal" | "small"
): React.CSSProperties => {
  return {
    transform: `translate(${32 * position[0] + 32 * position[1] + 100}px, ${
      16 * position[0] - 16 * position[1] - 40 * position[2] + 100
    }px) ${size === "small" ? "scale(0.75)" : ""}`,
    zIndex: `${100 + position[0] - position[1] + 10 * position[2]}`,
  };
};

const Character: React.FunctionComponent<Props> = ({
  position,
  index = 0,
  size = "normal",
}) => (
  <div
    className={styles.character}
    style={{
      ...calculatePosition(position, size),
      backgroundPosition: `-${index * 64}px 0px`,
    }}
  />
);

export default Character;
