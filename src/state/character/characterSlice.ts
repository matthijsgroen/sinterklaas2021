import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";
import { Position } from "../../types";

export interface CharacterState {
  x: number;
  y: number;
  z: number;
}

const initialState: CharacterState = {
  x: 2,
  y: 2,
  z: 2,
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    move: (state, action: PayloadAction<Position>) => {
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

export default characterSlice.reducer;
