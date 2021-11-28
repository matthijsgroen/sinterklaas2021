import { PreparedImageDefinition } from "geppetto-player";

export enum CharacterSprites {
  Tristan = 0,
  Catoo = 1,
  Tinka = 2,
  Carl = 3,
  Gina = 4,
  Piet = 5,
  Sint = 6,
  Amerigo = 7,
}

export type Creature = {
  card: CreatureCardId;
  id: string;
  health: number;
  energy: number;
  cooldowns: Record<string, number>;
  party: "left" | "right";
  inTurn: number;
};

export type ActionType = "heals" | "hurts" | "stuns";

export type ActionSentence = {
  source: Creature;
  action: ActionType;
  target: Creature;
  with: string;
  points: number;
  unit: "points" | "turns";
};

export type CombatResult = "inProgress" | "retreat" | "won" | "lost";

export type Direction = "north" | "east" | "south" | "west";
export type Position = [number, number, number];
export type TileSize = "normal" | "small" | "large" | "wide";
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
  dialog?: Dialog[];
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
  characterSprite: CharacterSprites;
  position: Position;
  fights: Fight[];
  rewards: {
    follower?: CharacterSprites;
    card?: string;
    removeCard?: string;
    xp?: number;
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
  damageType?: "stun";
  animationTrack?: string;
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

  texture: Promise<HTMLImageElement>;
  animation: PreparedImageDefinition;

  actions: Action[];
};
