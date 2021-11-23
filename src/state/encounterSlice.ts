import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface EncounterState {
  encounterCharacter: number;
  fightsFinished: number;
}

const initialState: EncounterState = {
  encounterCharacter: -1,
  fightsFinished: 0,
};

export const encounterSlice = createSlice({
  name: "encounter",
  initialState,
  reducers: {
    encounter: (state, action: PayloadAction<number>) => {
      state.encounterCharacter = action.payload;
      state.fightsFinished = 0;
    },
    closeEncounter: (state) => {
      state.encounterCharacter = -1;
    },
  },
});

export const { encounter, closeEncounter } = encounterSlice.actions;

export const selectActiveEncounter = (state: RootState) => state.encounter;

export default encounterSlice.reducer;
