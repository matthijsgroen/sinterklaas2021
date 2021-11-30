import React from "react";
import { Direction, Position, TerrainTile, TileSize } from "../types";
import styles from "./Tile.module.css";

type TileMapping = {
  [Key in TerrainTile["set"]]: string;
};

const tileMapping: TileMapping = {
  terrain: "kenney_platformerkit",
  furniture: "kenney_furniturekit",
  fantasy: "kenney_fantasytownkit",
};

const directionMapping: Record<
  TerrainTile["set"],
  Record<Direction, string>
> = {
  terrain: {
    north: "NE",
    east: "SE",
    south: "SW",
    west: "NW",
  },
  furniture: {
    north: "NE",
    east: "SE",
    south: "SW",
    west: "NW",
  },
  fantasy: {
    north: "N",
    east: "E",
    south: "S",
    west: "W",
  },
};

const remapDirection: Record<string, Record<Direction, Direction>> = {
  stairs: {
    east: "west",
    north: "west",
    west: "south",
    south: "east",
  },
};

const getTile = (tile: TerrainTile): string => {
  const direction = remapDirection[tile.img]
    ? remapDirection[tile.img][tile.direction ?? "north"]
    : tile.direction ?? "north";
  return `/images/${tileMapping[tile.set]}/Isometric/${tile.img}_${
    directionMapping[tile.set][direction]
  }.png`;
};

const sizeMapping: Record<TileSize, number> = {
  wide: 0,
  normal: 0,
  large: 60,
  small: -16,
};

type TileData = {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  offsetZ?: number;
};

type TileDirectionData = Record<string, TileData>;

const furnitureLookup: Record<string, TileDirectionData> = {
  floorFull: {
    north: {
      width: 128,
      height: 67,
      offsetX: 193,
      offsetY: 204,
    },
  },
  wall: {
    north: {
      width: 68,
      height: 94,
      offsetX: 254,
      offsetY: 254,
    },
    west: {
      width: 68,
      height: 94,
      offsetX: 194,
      offsetY: 254,
    },
  },
  bedSingle: {
    east: {
      width: 135,
      height: 82,
      offsetX: 206,
      offsetY: 270,
    },
  },
  desk: {
    east: {
      width: 112,
      height: 85,
      offsetX: 196,
      offsetY: 250,
    },
  },
  wallDoorway: {
    west: {
      width: 128,
      height: 158,
      offsetX: 154,
      offsetY: 124,
      offsetZ: 11,
    },
  },
  stairs: {
    east: {
      width: 190,
      height: 178,
      offsetX: 195,
      offsetY: 204,
      offsetZ: 1,
    },
  },
  loungeDesignSofa: {
    north: {
      width: 150,
      height: 110,
      offsetX: 195,
      offsetY: 224,
    },
  },
  doorwayOpen: {
    west: {
      width: 68,
      height: 130,
      offsetX: 194,
      offsetY: 220,
      offsetZ: 1,
    },
  },
};

const getDimensions = (tile: TerrainTile): TileData => {
  if (tile.set === "terrain") {
    const size = sizeMapping[tile.size ?? "normal"];

    return {
      width: 512,
      height: 512,
      offsetX: size,
      offsetY: 0,
    };
  } else if (tile.set === "fantasy") {
    const size = sizeMapping[tile.size ?? "normal"];
    const defaultSettings = {
      width: 512,
      height: 512,
      offsetX: tile.direction === "south" ? size + 4 : size,
      offsetY: tile.direction === "south" ? 4 : 0,
      offsetZ: tile.direction === "south" ? 1 : 0,
    };

    const elevatedSettings = {
      width: 512,
      height: 512,
      offsetX: 0,
      offsetY: -70,
      offsetZ: 1,
    };

    if (["roadCurb", "roadEdge", "road", "planks"].includes(tile.img))
      return elevatedSettings;

    return defaultSettings;
  } else {
    // furniture
    const defaultSettings = {
      width: 68,
      height: 94,
      offsetX: 194,
      offsetY: 254,
    };
    const tileConfig = furnitureLookup[tile.img];
    return tileConfig
      ? tileConfig[tile.direction ?? "north"] ?? defaultSettings
      : defaultSettings;
  }
};

const getStyle = (
  position: Position,
  tileData: TileData
): React.CSSProperties => {
  return {
    transform: `translate(${
      64 * position[0] + 64 * position[1] + tileData.offsetX
    }px, ${
      32 * position[0] - 32 * position[1] - 78 * position[2] + tileData.offsetY
    }px)`,
    zIndex: `${
      100 +
      position[0] -
      position[1] +
      10 * position[2] +
      (tileData.offsetZ ?? 0)
    }`,
  };
};

type Props = {
  tile: TerrainTile;
};

const Tile: React.FunctionComponent<Props> = ({ tile }) => {
  const dimensions = getDimensions(tile);
  return (
    <img
      src={getTile(tile)}
      width={dimensions.width}
      height={dimensions.height}
      alt={tile.img}
      className={styles.tile}
      style={getStyle(tile.coord, dimensions)}
    />
  );
};

export default Tile;
