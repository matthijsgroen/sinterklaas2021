import React, { useEffect, useCallback, useRef } from "react";
import { move, selectFollowers, selectPosition } from "../state/characterSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { Direction, LevelData, Position, TerrainTile } from "../types";
import Character from "./Character";
import styles from "./Level.module.css";
import Tile from "./Tile";

type Props = {
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

enum MoveDirection {
  Up,
  Down,
  Left,
  Right,
}

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

const isRamp = (img: string): boolean =>
  ["blockDirtRamp", "blockSlope", "blockSnowSlope"].includes(img);

const inDirection = (
  direction: Direction,
  xDelta: number,
  yDelta: number
): boolean =>
  (direction === "east" && xDelta === -1) ||
  (direction === "south" && yDelta === 1);

const inOppositeDirection = (
  direction: Direction,
  xDelta: number,
  yDelta: number
): boolean =>
  (direction === "east" && xDelta === 1) ||
  (direction === "south" && yDelta === -1);

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

type DirectionMap = {
  [Key in MoveDirection]: [number, number];
};

const directionMap: DirectionMap = {
  [MoveDirection.Up]: [-1, 0],
  [MoveDirection.Down]: [1, 0],
  [MoveDirection.Left]: [0, -1],
  [MoveDirection.Right]: [0, 1],
};

const Level: React.FunctionComponent<Props> = ({ data }) => {
  const position = useAppSelector(selectPosition);
  const followers = useAppSelector(selectFollowers);
  const dispatch = useAppDispatch();
  const posRef = useRef(position);
  // const [playerPos, setPlayerPos] = useState(position);

  const movePlayer = useCallback(
    (direction: MoveDirection) => {
      const deltas = directionMap[direction];
      posRef.current = calculateNewPos(data, posRef.current, ...deltas);
      dispatch(move(posRef.current));
    },
    [dispatch, data]
  );

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (preventEvents.includes(event.code)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      if (event.code === "ArrowUp") {
        movePlayer(MoveDirection.Up);
      }
      if (event.code === "ArrowDown") {
        movePlayer(MoveDirection.Down);
      }
      if (event.code === "ArrowLeft") {
        movePlayer(MoveDirection.Left);
      }
      if (event.code === "ArrowRight") {
        movePlayer(MoveDirection.Right);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [movePlayer]);

  return (
    <div className={styles.terrain}>
      {data.tiles.map((tile, index) => (
        <Tile tile={tile} key={index} />
      ))}
      {data.decorations.map((tile, index) => (
        <Tile tile={tile} key={index} />
      ))}
      {followers.map(({ index, pos }) => (
        <Character position={pos} index={index} key={index} size="small" />
      ))}
      <Character position={position} />
    </div>
  );
};

export default Level;
