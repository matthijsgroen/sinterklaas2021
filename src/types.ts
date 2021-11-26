export type Direction = "north" | "east" | "south" | "west";
export type Position = [number, number, number];
export type TileSize = "normal" | "small" | "large";
export type TerrainTile = {
  coord: Position;
  img: string;
  direction?: Direction;
  size?: TileSize;
  set: "terrain" | "furniture";
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
  conditions?: {
    minimalCards?: number;
  };
  conditionDialog: Dialog[];
  characterSprite: number;
  position: Position;
  fights: Fight[];
  rewards: {
    follower?: number;
    card?: string;
    removeCard?: string;
  };
};

export type LevelExit = {
  coord: Position;
  level: string;
  startCoord: Position;
};

export type LevelData = {
  name: string;
  tiles: TerrainTile[];
  decorations: TerrainTile[];
  characters: LevelCharacter[];
  exits: LevelExit[];
};

export type ActionTarget =
  | "weakness"
  | "minHealth"
  | "maxHealth"
  | "enemy"
  | "friendly"
  | "allEnemies"
  | "allFriendlies"
  | "self";

export type Action = {
  name: string;
  damage: number;
  cost: number;
  cooldown: number;
  targets: ActionTarget[];
};

export type CreatureCardId = string;

export type CreatureType = "shoe" | "bag" | "rod";

export type CreatureCard = {
  id: string;
  name: string;
  level: number;
  initiative: number;

  xpResult: number;

  type: CreatureType;
  health: number;
  energy: number;

  actions: Action[];
};
