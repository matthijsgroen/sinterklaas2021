import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modifier } from "../combatHelpers";
import creatures from "../data/creatures";
import {
  Action,
  ActionSentence,
  CombatResult,
  Creature,
  CreatureCard,
  CreatureCardId,
} from "../types";
import { RootState } from "./store";

export interface CombatState {
  inCombat: boolean;
  combatResult: CombatResult;
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

export const combatSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    startFight: (state, action: PayloadAction<CreatureCardId[]>) => {
      state.inCombat = true;
      state.combatResult = "inProgress";
      state.creatures = state.creatures
        .filter((c) => c.party === "left")
        .concat(action.payload.map(createCombatCreature("right")))
        .map((c) => ({ ...c, inTurn: 0 }));

      state.currentTurn = state.creatures.sort((a, b) => {
        const cA = creatures[a.card];
        const cB = creatures[b.card];
        return (
          a.inTurn * 100 + cA.initiative - (b.inTurn * 100 + cB.initiative)
        );
      })[0].id;
      state.lastActionLog = [];
    },
    startEncounter: (state, action: PayloadAction<CreatureCardId[]>) => {
      state.combatResult = "inProgress";
      state.creatures = ([] as Creature[]).concat(
        action.payload.map(createCombatCreature("left"))
      );
    },
    endEncounter: (state) => {
      state.inCombat = false;
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

      const actionDetails = ownCard.actions.find(
        (a) => a.name === action.payload.action
      );
      if (actionDetails) {
        if (actionDetails.cost > 0) {
          currentcreature.energy -= actionDetails.cost;
        }
        if (actionDetails.cooldown > 0) {
          currentcreature.cooldowns[actionDetails.name] =
            actionDetails.cooldown;
        }

        state.creatures
          .filter((creature) => {
            const isEnemy = creature.party !== team;

            return (
              action.payload.target === creature.id ||
              (actionDetails.targets.includes("allEnemies") &&
                isEnemy &&
                creature.health > 0 &&
                action.payload.target === "all") ||
              (actionDetails.targets.includes("allFriendlies") &&
                !isEnemy &&
                creature.health > 0 &&
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

            if (
              actionDetails.damage > 0 &&
              actionDetails.damageType === undefined
            ) {
              const damage = Math.round(
                modifier(ownCard.type, card.type) * actionDetails.damage
              );

              if (state.currentTurn && damage > 0) {
                state.lastActionLog.push({
                  source: currentcreature,
                  action: "hurts",
                  with: actionDetails.name,
                  target: creature,
                  points: damage,
                  unit: "points",
                });
                // dealing damage
                creature.health -= damage;
              }
            }

            if (
              actionDetails.damage > 0 &&
              actionDetails.damageType === "stun"
            ) {
              if (state.currentTurn) {
                state.lastActionLog.push({
                  source: currentcreature,
                  action: "stuns",
                  with: actionDetails.name,
                  target: creature,
                  points: actionDetails.damage,
                  unit: "turns",
                });
                // dealing damage
                creature.cooldowns = {
                  ...creature.cooldowns,
                  stunned: actionDetails.damage,
                };
              }
            }
          });
      }

      // Need a next turn?

      const leftAlive = state.creatures.some(
        (c) => c.party === "left" && c.health > 0
      );
      const rightAlive = state.creatures.some(
        (c) => c.party === "right" && c.health > 0
      );

      if (leftAlive && rightAlive) {
        state.currentTurn = state.creatures
          .filter((a) => a.health > 0)
          .sort((a, b) => {
            const cA = creatures[a.card];
            const cB = creatures[b.card];
            return (
              a.inTurn * 100 + cA.initiative - (b.inTurn * 100 + cB.initiative)
            );
          })[0].id;
      } else {
        state.currentTurn = null;
        state.combatResult = leftAlive && !rightAlive ? "won" : "lost";
      }
    },
  },
});

export const { startFight, startEncounter, actionTurn, endEncounter } =
  combatSlice.actions;

export const selectInCombat = (state: RootState) => state.combat.inCombat;
export const selectFightWon = (state: RootState) =>
  state.combat.combatResult === "won";

export type CombatCreature = Omit<Creature, "card"> & {
  card: CreatureCard;
};

export type CombatStatus = {
  outcome: CombatResult;
  partyA: CombatCreature[];
  partyB: CombatCreature[];
  turn?: {
    creature: CombatCreature;
    isStunned: boolean;
    actions: (Action & { disabled: boolean; inCooldown: number })[];
  };
};

export const selectCombatLog = (state: RootState) => state.combat.lastActionLog;

export const selectLevelingUp = (state: RootState) =>
  state.character.cards.find(
    (card) =>
      state.character.xp[card] >= creatures[card].xpResult &&
      creatures[card].xpResult > 0
  );

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
    outcome: state.combat.combatResult,
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
            isStunned: !!(
              currentCreature.cooldowns["stunned"] &&
              currentCreature.cooldowns["stunned"] > 0
            ),
            actions,
          }
        : undefined,
  };
};

export default combatSlice.reducer;
