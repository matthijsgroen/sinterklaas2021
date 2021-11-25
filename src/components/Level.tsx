import React, { useEffect, useCallback, useRef, useMemo } from "react";
import {
  enterLevel,
  move,
  selectFollowers,
  selectPosition,
} from "../state/characterSlice";
import { startEncounter } from "../state/combatSlice";
import { encounter } from "../state/encounterSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { Direction, LevelData, Position, TerrainTile } from "../types";
import Character, { calculateXy } from "./Character";
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

const samePosition = (a: Position, b: Position) =>
  a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

const isRamp = (img: string): boolean =>
  ["blockDirtRamp", "blockSlope", "blockSnowSlope", "stairs"].includes(img);

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

const X_MARGIN = 300;
const Y_MARGIN = 200;

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
  const terrainRef = useRef<HTMLDivElement>(null);
  const canMoveRef = useRef(true);
  const levelCharacters = useMemo(
    () =>
      data.characters.filter(
        (f) =>
          !followers.some((follower) => f.characterSprite === follower.index)
      ),
    [data, followers]
  );
  useEffect(() => {
    console.log("synching position");
    posRef.current = position;
  }, [data, position]);

  const movePlayer = useCallback(
    (direction: MoveDirection) => {
      const deltas = directionMap[direction];
      const newPos = calculateNewPos(data, posRef.current, ...deltas);
      console.log(posRef.current, newPos, deltas);

      // update scroll position
      const screenPos = calculateXy(newPos);
      if (terrainRef.current) {
        const { width, height } = terrainRef.current.getBoundingClientRect();

        let needsScroll = false;
        const scrollSettings: ScrollToOptions = {
          left: terrainRef.current.scrollLeft,
          top: terrainRef.current.scrollTop,
          behavior: "smooth",
        };

        if (screenPos.x - terrainRef.current.scrollLeft > width - X_MARGIN) {
          scrollSettings.left = screenPos.x + X_MARGIN - width;
          needsScroll = true;
        }
        if (screenPos.x - terrainRef.current.scrollLeft < X_MARGIN) {
          scrollSettings.left = screenPos.x - X_MARGIN;
          needsScroll = true;
        }

        if (screenPos.y - terrainRef.current.scrollTop > height - Y_MARGIN) {
          scrollSettings.top = screenPos.y + Y_MARGIN - height;
          needsScroll = true;
        }

        if (screenPos.y - terrainRef.current.scrollTop < Y_MARGIN) {
          scrollSettings.top = screenPos.y - Y_MARGIN;
          needsScroll = true;
        }

        if (needsScroll) {
          terrainRef.current.scroll(scrollSettings);
        }
      }

      // Check if we are meeting a character;
      const onExit = data.exits.find((c) => samePosition(c.coord, newPos));
      if (onExit) {
        console.log("Switching level");
        dispatch(
          enterLevel({ level: onExit.level, position: onExit.startCoord })
        );
        return;
      }

      const meetCharacter = levelCharacters.find((c) =>
        samePosition(c.position, newPos)
      );
      if (meetCharacter) {
        canMoveRef.current = false;
        dispatch(encounter(meetCharacter.characterSprite));
        dispatch(startEncounter());
      } else {
        posRef.current = newPos;
        dispatch(move(posRef.current));
      }
    },
    [dispatch, data, levelCharacters]
  );

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (preventEvents.includes(event.code)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      if (canMoveRef.current) {
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
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [movePlayer]);

  return (
    <div className={styles.terrain} ref={terrainRef}>
      {data.tiles.map((tile, index) => (
        <Tile tile={tile} key={index} />
      ))}
      {data.decorations.map((tile, index) => (
        <Tile tile={tile} key={index} />
      ))}
      {levelCharacters.map((character, index) => (
        <Character
          position={character.position}
          index={character.characterSprite}
          key={index}
        />
      ))}
      {followers.map(({ index, pos }) => (
        <Character position={pos} index={index} key={index} size="small" />
      ))}
      <Character position={position} />
    </div>
  );
};

export default Level;
