import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CharacterSprites, CreatureCardId, Position } from "../types";

export interface CharacterState {
  x: number;
  y: number;
  z: number;
  level: string;
  positionHistory: Position[];
  followers: CharacterSprites[];
  cards: CreatureCardId[];
  xp: Record<CreatureCardId, number>;
}

const initialState: CharacterState = {
  // level: "Berg",
  // x: 18,
  // y: 0,
  // z: 1,
  level: "Slaapkamer",
  x: 3,
  y: 1,
  z: 2,
  // level: "Stage1",
  // x: 2,
  // y: 2,
  // z: 2,
  positionHistory: [],
  followers: [],
  cards: [],
  xp: {},
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    move: (state, action: PayloadAction<Position>) => {
      if (
        action.payload[0] === state.x &&
        action.payload[1] === state.y &&
        action.payload[2] === state.z
      )
        return;
      state.positionHistory.unshift([state.x, state.y, state.z]);
      state.positionHistory = state.positionHistory.slice(0, 6);

      state.x = action.payload[0];
      state.y = action.payload[1];
      state.z = action.payload[2];
    },
    getCard: (state, action: PayloadAction<string>) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((c) => c !== action.payload);
    },
    addFollower: (state, action: PayloadAction<CharacterSprites>) => {
      state.followers.unshift(action.payload);
    },
    giveXP: (state, action: PayloadAction<number>) => {
      state.cards.forEach((card) => {
        state.xp[card] = state.xp[card] || 0;
        state.xp[card] += action.payload;
      });
    },
    enterLevel: (
      state,
      action: PayloadAction<{ level: string; position: Position }>
    ) => {
      state.level = action.payload.level;
      const [x, y, z] = action.payload.position;
      state.x = x;
      state.y = y;
      state.z = z;
      state.positionHistory = [];
    },
  },
});

export const { move, getCard, removeCard, enterLevel, addFollower, giveXP } =
  characterSlice.actions;

export const selectPosition = (state: RootState): Position => [
  state.character.x,
  state.character.y,
  state.character.z,
];

export const selectZone = (state: RootState): string => state.character.level;

export const selectCardIds = (state: RootState): CreatureCardId[] =>
  state.character.cards;

export const selectFollowers = (
  state: RootState
): { pos: Position; index: CharacterSprites }[] =>
  state.character.followers.map((id, index) => ({
    index: id,
    pos: state.character.positionHistory[index] || [
      state.character.x,
      state.character.y,
      state.character.z,
    ],
  }));

export default characterSlice.reducer;
