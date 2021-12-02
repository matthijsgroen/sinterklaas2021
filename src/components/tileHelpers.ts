import { Direction, TerrainTile } from "../types";

const tileMapping: Record<TerrainTile["set"], string> = {
  terrain: "kenney_platformerkit",
  furniture: "kenney_furniturekit",
  fantasy: "kenney_fantasytownkit",
  holiday: "kenney_holidaykit",
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
  holiday: {
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

export const getTileSrc = (tile: TerrainTile): string => {
  const direction = remapDirection[tile.img]
    ? remapDirection[tile.img][tile.direction ?? "north"]
    : tile.direction ?? "north";
  return `/images/${tileMapping[tile.set]}/Isometric/${tile.img}_${
    directionMapping[tile.set][direction]
  }.png`;
};
