import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterSprites } from "../types";
import { RootState } from "./store";

export interface EncounterState {
  encounterCharacter: number;
  fightsFinished: number;
  result: "inProgress" | "won" | "lost";
  encountersCompleted: number[];
}

const initialState: EncounterState = {
  encounterCharacter: -1,
  fightsFinished: 0,
  result: "inProgress",
  encountersCompleted: [],
};

export const encounterSlice = createSlice({
  name: "encounter",
  initialState,
  reducers: {
    encounter: (state, action: PayloadAction<number>) => {
      state.encounterCharacter = action.payload;
      state.fightsFinished = 0;
      state.result = "inProgress";
    },
    closeEncounter: (state, action: PayloadAction<boolean>) => {
      state.fightsFinished = 0;
      state.result = "inProgress";
      if (action.payload) {
        state.encountersCompleted.push(state.encounterCharacter);
      }
      state.encounterCharacter = -1;
    },
    loseEncounter: (state) => {
      state.result = "lost";
    },
    completeFight: (state) => {
      state.fightsFinished += 1;
    },
    winEncounter: (state) => {
      state.result = "won";
    },
  },
});

export const {
  encounter,
  closeEncounter,
  winEncounter,
  loseEncounter,
  completeFight,
} = encounterSlice.actions;

export const selectActiveEncounter = (state: RootState) => state.encounter;

export default encounterSlice.reducer;
