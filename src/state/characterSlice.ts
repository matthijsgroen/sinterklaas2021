import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Position } from "../types";

export interface CharacterState {
  x: number;
  y: number;
  z: number;
  positionHistory: Position[];
  followers: number[];
}

const initialState: CharacterState = {
  x: 2,
  y: 2,
  z: 2,
  positionHistory: [],
  followers: [],
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
  },
});

export const { move } = characterSlice.actions;

export const selectPosition = (state: RootState): Position => [
  state.character.x,
  state.character.y,
  state.character.z,
];

export const selectFollowers = (
  state: RootState
): { pos: Position; index: number }[] =>
  state.character.followers.map((id, index) => ({
    index: id,
    pos: state.character.positionHistory[index] || [
      state.character.x,
      state.character.y,
      state.character.z,
    ],
  }));

export default characterSlice.reducer;
