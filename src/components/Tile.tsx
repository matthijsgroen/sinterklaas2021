import React from "react";
import { Direction, Position, TerrainTile, TileSize } from "../types";
import styles from "./Tile.module.css";

type TileMapping = {
  [Key in TerrainTile["set"]]: string;
};

type DirectionMapping = {
  [Key in Direction]: string;
};

const tileMapping: TileMapping = {
  terrain: "kenney_platformerkit2",
};

const directionMapping: DirectionMapping = {
  north: "NE",
  east: "SE",
  south: "SW",
  west: "NW",
};

const getTile = (tile: TerrainTile): string => {
  return `/images/${tileMapping[tile.set]}/Isometric/${tile.img}_${
    directionMapping[tile.direction ?? "north"]
  }.png`;
};

const sizeMapping: Record<TileSize, number> = {
  normal: 0,
  large: 32,
  small: -16,
};

const getStyle = (
  position: Position,
  tileSize: TileSize = "normal"
): React.CSSProperties => {
  const size = sizeMapping[tileSize];

  return {
    transform: `translate(${32 * position[0] + 32 * position[1] + size}px, ${
      16 * position[0] - 16 * position[1] - 40 * position[2]
    }px)`,
    zIndex: `${100 + position[0] - position[1] + 10 * position[2]}`,
  };
};

type Props = {
  tile: TerrainTile;
};

const Tile: React.FunctionComponent<Props> = ({ tile }) => (
  <img
    src={getTile(tile)}
    alt={tile.img}
    className={styles.tile}
    style={getStyle(tile.coord, tile.size)}
  />
);

export default Tile;
