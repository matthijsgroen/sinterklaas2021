import { isWeakFor } from "./combatHelpers";
import { CombatStatus } from "./state/combatSlice";

const DUMMY_ACTION = { action: "wait", target: "all" };

export const enemyActionSelection = (
  combatStatus: CombatStatus
): { action: string; target: string } => {
  if (combatStatus.turn === undefined || combatStatus.turn.isStunned) {
    return DUMMY_ACTION;
  }
  // weak team mates? heal!
  const needsHealing = combatStatus.partyB
    .filter((c) => c.health < 15)
    .sort((a, b) => a.health - b.health);
  const healingAbilities = combatStatus.turn.actions
    .filter((a) => !a.disabled && a.damage < 0)
    .sort((a, b) => a.cost - b.cost);

  if (needsHealing.length > 0 && healingAbilities.length > 0) {
    const defensiveAction = healingAbilities[0];

    const target =
      defensiveAction.targets[0] === "allFriendlies"
        ? "all"
        : needsHealing[0].id;

    return { action: defensiveAction.name, target };
  }

  const specialAbilities = combatStatus.turn.actions
    .filter((a) => a.damageType && !a.disabled)
    .sort((a, b) => a.cost - b.cost)[0];

  // max offence!
  const offensiveAction = combatStatus.turn.actions
    .filter((a) => !a.disabled)
    .sort((a, b) => b.damage + b.cost - (a.damage + a.cost))[0];

  const action = specialAbilities || offensiveAction;

  if (action) {
    const target = action.targets.reduce<null | string>(
      (result, targetType) => {
        if (targetType === "allEnemies") {
          return "all";
        }
        if (targetType === "maxHealth") {
          const target = combatStatus.partyA.reduce((r, current) =>
            current.health > r.health ? current : r
          );
          return target.id;
        }
        if (targetType === "minHealth") {
          const target = combatStatus.partyA.reduce((r, current) =>
            current.health < r.health ? current : r
          );
          return target.id;
        }
        if (targetType === "weakness") {
          const target = combatStatus.partyA.find((enemy) =>
            combatStatus.turn
              ? isWeakFor(enemy.card.type, combatStatus.turn.creature.card.type)
              : false
          );

          if (target) return target.id;
        }
        return result;
      },
      null
    );
    if (target) {
      return {
        action: action.name,
        target,
      };
    }
  }
  return DUMMY_ACTION;
};
