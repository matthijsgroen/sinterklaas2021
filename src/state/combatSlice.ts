import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreatureCardId } from "../types";
import { RootState } from "./store";

type Creature = {
  card: CreatureCardId;
  id: "string";
  health: number;
  energy: number;
  cooldowns: Record<string, number>;
  party: "left" | "right";
};

type ActionSentence = {
  source: Creature;
  action: "heals" | "hurts" | "stuns";
  target: Creature;
  points: number;
  unit: "points" | "turns";
};

export interface CombatState {
  inCombat: boolean;
  combatResult: "inProgress" | "retreat" | "won" | "lost";
  creatures: Creature[];
  currentTurn: Creature | null;
  lastActionLog: ActionSentence[];
}

const initialState: CombatState = {
  inCombat: false,
  combatResult: "won",
  creatures: [],
  currentTurn: null,
  lastActionLog: [],
};

export const combatSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    startFight: (
      state,
      action: PayloadAction<{
        partyA: CreatureCardId[];
        partyB: CreatureCardId[];
      }>
    ) => {
      state.inCombat = true;
    },
    startEncounter: (state) => {
      state.combatResult = "inProgress";
    },
  },
});

export const { startFight, startEncounter } = combatSlice.actions;

export const selectInCombat = (state: RootState) => state.combat.inCombat;

export default combatSlice.reducer;
