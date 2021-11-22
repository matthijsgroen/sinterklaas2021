import React from "react";
import { Position } from "../types";
import styles from "./Character.module.css";

type Props = {
  position: Position;
};

const calculatePosition = (position: Position): React.CSSProperties => {
  return {
    transform: `translate(${32 * position[0] + 32 * position[1] + 100}px, ${
      16 * position[0] - 16 * position[1] - 40 * position[2] + 100
    }px)`,
    zIndex: `${100 + position[0] - position[1] + 10 * position[2]}`,
  };
};

const Character: React.FunctionComponent<Props> = ({ position }) => (
  <img
    src="/images/characters_map/tristan.png"
    alt="character"
    className={styles.character}
    style={calculatePosition(position)}
  />
);

export default Character;
