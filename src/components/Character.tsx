import React from "react";
import { Position } from "../types";
import styles from "./Character.module.css";

type Props = {
  position: Position;
  index?: number;
  size?: "normal" | "small";
};

export const calculateXy = (position: Position): { x: number; y: number } => ({
  x: 64 * position[0] + 64 * position[1] + 200,
  y: 32 * position[0] - 32 * position[1] - 78 * position[2] + 200,
});

const calculatePosition = (
  position: Position,
  size: "normal" | "small"
): React.CSSProperties => {
  const { x, y } = calculateXy(position);
  return {
    transform: `translate(${x}px, ${y}px) ${
      size === "small" ? "scale(0.75)" : ""
    }`,
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
      backgroundPosition: `-${index * 128}px 0px`,
    }}
  />
);

export default Character;
