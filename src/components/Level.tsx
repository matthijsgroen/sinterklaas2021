import React, {
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useState,
} from "react";
import className from "../className";
import {
  enterLevel,
  move,
  selectCardIds,
  selectFollowers,
  selectPosition,
} from "../state/characterSlice";
import { startEncounter } from "../state/combatSlice";
import { encounter, selectActiveEncounter } from "../state/encounterSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { Direction, LevelData, Position, TerrainTile } from "../types";
import Character, { calculateXy } from "./Character";
import styles from "./Level.module.css";
import Tile from "./Tile";
import Tristamon from "./Tristamon";

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
  None,
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
    if (
      tile.size === "wide" &&
      (tile.coord[0] === x ||
        (tile.coord[0] + 1 === x && tile.direction === "east")) &&
      (tile.coord[1] === y ||
        (tile.coord[1] + 1 === y && (tile.direction ?? "north") === "north")) &&
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

const isFloor = (newTerrain: TerrainTile): boolean =>
  !["treePineSnow"].includes(newTerrain.img);

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
  if (newTerrain.coord[2] !== z - 1 || !isFloor(newTerrain)) {
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
  [MoveDirection.None]: [0, 0],
};

type LevelSwitchState = "fadeout" | "levelSwitch" | "fadein";

const Level: React.FunctionComponent<Props> = ({ data: levelData }) => {
  const position = useAppSelector(selectPosition);
  const cardIds = useAppSelector(selectCardIds);
  const followers = useAppSelector(selectFollowers);
  const dispatch = useAppDispatch();
  const activeEncounter = useAppSelector(selectActiveEncounter);
  const posRef = useRef(position);
  const terrainRef = useRef<HTMLDivElement>(null);
  const canMoveRef = useRef(true);

  const levelSwitchRef = useRef(levelData);
  const [levelSwitchState, setLevelSwitchState] =
    useState<LevelSwitchState>("fadeout");
  const data = levelSwitchRef.current;

  useEffect(() => {
    if (levelSwitchState === "fadein" && levelData !== levelSwitchRef.current) {
      setLevelSwitchState("fadeout");
    }
    if (levelSwitchState === "fadeout") {
      const timeId = setTimeout(() => {
        levelSwitchRef.current = levelData;
        setLevelSwitchState("levelSwitch");
      }, 500);
      return () => clearTimeout(timeId);
    }
    if (levelSwitchState === "levelSwitch") {
      setLevelSwitchState("fadein");
      return;
    }
  }, [levelSwitchState, levelData]);

  const levelCharacters = useMemo(
    () =>
      data.characters.filter(
        (f) =>
          !activeEncounter.encountersCompleted.some(
            (follower) => f.characterSprite === follower
          )
      ),
    [data, activeEncounter.encountersCompleted]
  );
  useEffect(() => {
    posRef.current = position;
  }, [data, position]);

  useEffect(() => {
    if (activeEncounter.encounterCharacter === -1) {
      canMoveRef.current = true;
    }
  }, [activeEncounter.encounterCharacter]);

  const movePlayer = useCallback(
    (direction: MoveDirection) => {
      const deltas = directionMap[direction];
      const newPos = calculateNewPos(data, posRef.current, ...deltas);

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
        dispatch(startEncounter(cardIds));
      } else {
        posRef.current = newPos;
        dispatch(move(posRef.current));
      }
    },
    [dispatch, data, levelCharacters, cardIds]
  );

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (preventEvents.includes(event.code)) {
        event.preventDefault();
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
    movePlayer(MoveDirection.None);

    window.addEventListener("keydown", keyHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [movePlayer]);

  return (
    <div
      className={className({
        [styles.terrain]: true,
        [styles.fadeout]: levelSwitchState !== "fadein",
      })}
      ref={terrainRef}
    >
      <Tristamon />
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
          key={character.characterSprite}
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
