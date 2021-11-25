import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import creatures from "../creatures";
import { Action, CreatureCard, CreatureCardId, CreatureType } from "../types";
import { RootState } from "./store";

type Creature = {
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

export interface CombatState {
  inCombat: boolean;
  combatResult: "inProgress" | "retreat" | "won" | "lost";
  creatures: Creature[];
  currentTurn: string | null;
  lastActionLog: ActionSentence[];
}

const initialState: CombatState = {
  inCombat: false,
  combatResult: "won",
  creatures: [],
  currentTurn: null,
  lastActionLog: [],
};

const createCombatCreature =
  (party: Creature["party"]) =>
  (cardId: string, index: number): Creature => {
    const creatureCard = creatures[cardId];
    if (!creatureCard) {
      throw new Error(`Creature card with id "${cardId}" not found`);
    }

    return {
      card: cardId,
      id: `${cardId}${index}`,
      health: creatureCard.health,
      energy: creatureCard.energy,
      cooldowns: {},
      party,
      inTurn: 0,
    };
  };

const modifier = (from: CreatureType, to: CreatureType): number =>
  (from === "shoe" && to === "bag") ||
  (from === "bag" && to === "rod") ||
  (from === "rod" && to === "shoe")
    ? 1.3
    : (from === "shoe" && to === "rod") ||
      (from === "rod" && to === "bag") ||
      (from === "bag" && to === "shoe")
    ? 0.5
    : 1.0;

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
      state.combatResult = "inProgress";
      state.creatures = ([] as Creature[])
        .concat(action.payload.partyA.map(createCombatCreature("left")))
        .concat(action.payload.partyB.map(createCombatCreature("right")));

      state.currentTurn = state.creatures.sort((a, b) => {
        const cA = creatures[a.card];
        const cB = creatures[b.card];
        return (
          a.inTurn * 100 + cA.initiative - (b.inTurn * 100 + cB.initiative)
        );
      })[0].id;
    },
    startEncounter: (state) => {
      state.combatResult = "inProgress";
    },
    actionTurn: (
      state,
      action: PayloadAction<{ action: string; target: string }>
    ) => {
      const currentcreature = state.creatures.find(
        (c) => c.id === state.currentTurn
      );
      if (!currentcreature) return;

      const team = currentcreature.party;
      const ownCard = creatures[currentcreature.card];
      const actionDetails = ownCard.actions.find(
        (a) => a.name === action.payload.action
      );
      if (!actionDetails) return;
      state.lastActionLog = [];

      currentcreature.inTurn += 1;
      currentcreature.cooldowns = Object.keys(currentcreature.cooldowns).reduce(
        (result, name) =>
          currentcreature.cooldowns[name] > 1
            ? {
                ...result,
                [name]: currentcreature.cooldowns[name] - 1,
              }
            : result,
        {}
      );

      if (actionDetails.cost > 0) {
        currentcreature.energy -= actionDetails.cost;
      }
      if (actionDetails.cooldown > 0) {
        currentcreature.cooldowns[actionDetails.name] = actionDetails.cooldown;
      }

      state.creatures
        .filter((creature) => {
          const isEnemy = creature.party !== team;

          return (
            action.payload.target === creature.id ||
            (actionDetails.targets.includes("allEnemies") &&
              isEnemy &&
              action.payload.target === "all") ||
            (actionDetails.targets.includes("allFriendlies") &&
              !isEnemy &&
              action.payload.target === "all")
          );
        })
        .forEach((creature) => {
          if (!state.currentTurn) return;
          const card = creatures[creature.card];

          if (actionDetails.damage < 0) {
            const healing = Math.min(
              card.health - creature.health,
              actionDetails.damage * -1
            );

            if (healing > 0) {
              state.lastActionLog.push({
                source: currentcreature,
                action: "heals",
                target: creature,
                with: actionDetails.name,
                points: healing,
                unit: "points",
              });
              // healing
              creature.health += healing;
            }
          }

          if (actionDetails.damage > 0) {
            const damage =
              modifier(ownCard.type, card.type) * actionDetails.damage;

            if (state.currentTurn && damage > 0) {
              state.lastActionLog.push({
                source: currentcreature,
                action: "hurts",
                with: actionDetails.name,
                target: creature,
                points: damage,
                unit: "points",
              });
              // healing
              creature.health -= damage;
            }
          }
        });

      state.currentTurn = state.creatures.sort((a, b) => {
        const cA = creatures[a.card];
        const cB = creatures[b.card];
        return (
          a.inTurn * 100 + cA.initiative - (b.inTurn * 100 + cB.initiative)
        );
      })[0].id;
    },
  },
});

export const { startFight, startEncounter, actionTurn } = combatSlice.actions;

export const selectInCombat = (state: RootState) => state.combat.inCombat;

export type CombatCreature = Omit<Creature, "card"> & {
  card: CreatureCard;
};

type CombatStatus = {
  partyA: CombatCreature[];
  partyB: CombatCreature[];
  turn?: {
    creature: CombatCreature;
    actions: (Action & { disabled: boolean; inCooldown: number })[];
  };
};

export const selectCombatLog = (state: RootState) => state.combat.lastActionLog;

export const selectCombatStatus = (state: RootState): CombatStatus => {
  const currentCreature = state.combat.creatures.find(
    (c) => c.id === state.combat.currentTurn
  );

  const currentCard = currentCreature ? creatures[currentCreature.card] : null;
  const actions = currentCard
    ? currentCard.actions.map((a) => ({
        ...a,
        disabled:
          (currentCreature?.energy || 0) < a.cost ||
          !!currentCreature?.cooldowns[a.name],
        inCooldown: currentCreature?.cooldowns[a.name] ?? 0,
      }))
    : [];
  return {
    partyA: state.combat.creatures
      .filter((c) => c.party === "left")
      .map<CombatCreature>((c) => ({
        ...c,
        card: creatures[c.card],
      })),
    partyB: state.combat.creatures
      .filter((c) => c.party === "right")
      .map<CombatCreature>((c) => ({
        ...c,
        card: creatures[c.card],
      })),
    turn:
      currentCard && currentCreature
        ? {
            creature: { ...currentCreature, card: currentCard },
            actions,
          }
        : undefined,
  };
};

export default combatSlice.reducer;
