import React, { useEffect, useState } from "react";
import { Direction, LevelData, Position, TerrainTile } from "../types";
import Character from "./Character";
import styles from "./Level.module.css";
import Tile from "./Tile";

type Props = {
  direction: Direction;
  position: Position;
  data: LevelData;
};

const preventEvents = [
  "Enter",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "Space",
];

const getTopTerrain = (
  data: LevelData,
  x: number,
  y: number
): TerrainTile | null => {
  let topZ = -1;
  let result: TerrainTile | null = null;
  data.tiles.forEach((tile) => {
    if (tile.coord[0] === x && tile.coord[1] === y && tile.coord[2] > topZ) {
      topZ = tile.coord[2];
      result = tile;
    }
    if (
      tile.size === "large" &&
      (tile.coord[0] === x || tile.coord[0] + 1 === x) &&
      (tile.coord[1] === y || tile.coord[1] + 1 === y) &&
      tile.coord[2] > topZ
    ) {
      topZ = tile.coord[2];
      result = tile;
    }
  });
  return result;
};

const isRamp = (img: string): boolean => ["blockDirtRamp"].includes(img);
const inDirection = (
  direction: Direction,
  xDelta: number,
  yDelta: number
): boolean => direction === "east" && xDelta === -1;

const inOppositeDirection = (
  direction: Direction,
  xDelta: number,
  yDelta: number
): boolean => direction === "east" && xDelta === 1;

const calculateNewPos = (
  levelData: LevelData,
  position: Position,
  xDelta: number,
  yDelta: number
): Position => {
  let [x, y, z] = position;
  const currentTerrain = getTopTerrain(levelData, position[0], position[1]);
  if (currentTerrain && isRamp(currentTerrain.img)) {
    if (inDirection(currentTerrain.direction || "north", xDelta, yDelta)) {
      z += 0.5;
    }
    if (
      inOppositeDirection(currentTerrain.direction || "north", xDelta, yDelta)
    ) {
      z -= 0.5;
    }
  }

  const newTerrain = getTopTerrain(
    levelData,
    position[0] + xDelta,
    position[1] + yDelta
  );
  if (newTerrain === null) {
    // Cliff!
    return position;
  }

  if (isRamp(newTerrain.img)) {
    // Walking 'on' the ramp
    if (
      inDirection(newTerrain.direction || "north", xDelta, yDelta) &&
      newTerrain.coord[2] === z
    ) {
      return [x + xDelta, y + yDelta, z + 0.5];
    } else if (
      inOppositeDirection(newTerrain.direction || "north", xDelta, yDelta) &&
      newTerrain.coord[2] === z - 1
    ) {
      return [x + xDelta, y + yDelta, z - 0.5];
    } else {
      return position;
    }
  }
  // Higher or lower level
  if (newTerrain.coord[2] !== z - 1) {
    return position;
  }

  return [x + xDelta, y + yDelta, z];
};

const Level: React.FunctionComponent<Props> = ({ data, position }) => {
  const [playerPos, setPlayerPos] = useState(position);

  useEffect(() => {
    const preventKeyboardScrolling = (event: KeyboardEvent) => {
      if (preventEvents.includes(event.code)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener("keydown", preventKeyboardScrolling);
    const keyHandler = (event: KeyboardEvent) => {
      if (event.code === "ArrowUp") {
        setPlayerPos((pos) => calculateNewPos(data, pos, 0, 1));
      }
      if (event.code === "ArrowDown") {
        setPlayerPos((pos) => calculateNewPos(data, pos, 0, -1));
      }
      if (event.code === "ArrowLeft") {
        setPlayerPos((pos) => calculateNewPos(data, pos, -1, 0));
      }
      if (event.code === "ArrowRight") {
        setPlayerPos((pos) => calculateNewPos(data, pos, 1, 0));
      }
    };

    window.addEventListener("keyup", keyHandler);

    return () => {
      window.removeEventListener("keyup", keyHandler);
      window.removeEventListener("keydown", preventKeyboardScrolling);
    };
  }, [data]);

  return (
    <div className={styles.terrain}>
      {data.tiles.map((tile, index) => (
        <Tile tile={tile} key={index} />
      ))}
      <Character position={playerPos} />
    </div>
  );
};

export default Level;
