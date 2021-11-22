export type Direction = "north" | "east" | "south" | "west";
export type Position = [number, number, number];
export type TileSize = "normal" | "small" | "large";
export type TerrainTile = {
  coord: Position;
  img: string;
  direction?: Direction;
  size?: TileSize;
  set: "terrain";
};

export type LevelData = {
  name: string;
  startPosition: Position;
  tiles: TerrainTile[];
};
