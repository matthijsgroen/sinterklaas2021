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

export type Dialog = {
  characterName: string;
  characterColor: string;
  text: string[];
};

export type Fight = {
  dialog?: Dialog;
  enemies: CreatureCardId[];
};

export type LevelCharacter = {
  initialDialog: Dialog[];
  winDialog: Dialog[];
  loseDialog: Dialog[];
  characterSprite: number;
  position: Position;
  fights: Fight[];
};

export type LevelData = {
  name: string;
  startPosition: Position;
  tiles: TerrainTile[];
  decorations: TerrainTile[];
  characters: LevelCharacter[];
};

type ActionTarget =
  | "weakness"
  | "minHealth"
  | "maxHealth"
  | "enemy"
  | "friendly"
  | "allEnemies"
  | "allFriendlies"
  | "self";

type Action = {
  name: string;
  damage: number;
  cost: number;
  cooldown: number;
  targets: ActionTarget[];
};

export type CreatureCardId = string;

export type CreatureCard = {
  id: string;
  name: string;
  level: number;
  initiative: number;

  xpResult: number;

  type: "shoe" | "bag" | "rod";
  health: number;
  energy: number;

  actions: Action[];
};
