import React, { useState, useEffect } from "react";
import className from "../className";
import { isWeakFor } from "../combatHelpers";
import {
  actionTurn,
  CombatCreature,
  endEncounter,
  selectCombatLog,
  selectCombatStatus,
} from "../state/combatSlice";
import {
  completeFight,
  loseEncounter,
  selectActiveEncounter,
  winEncounter,
} from "../state/encounterSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  ActionTarget,
  CreatureCard,
  CreatureType,
  LevelCharacter,
} from "../types";
import styles from "./CombatArena.module.css";
import CombatLogSentence from "./CombatLogSentence";

type MemberProps = {
  member: CombatCreature;
  inTurn: boolean;
};

const iconMap: Record<CreatureType, string> = {
  shoe: "✂️",
  bag: "📄",
  rod: "🪨",
};

const iconFor = (name: CreatureType): string => iconMap[name];

const MemberStats: React.FunctionComponent<MemberProps> = ({
  member,
  inTurn,
}) => {
  const stunned =
    member.cooldowns["stunned"] && member.cooldowns["stunned"] > 0;
  return (
    <div style={{ opacity: member.health > 0 ? 1 : 0.5 }}>
      <p>
        <strong>
          {inTurn ? "➡️ " : ""}
          {member.card.name}
          {stunned && "🌪"}
        </strong>{" "}
        ({member.card.type} {iconFor(member.card.type)})
      </p>
      <p className={styles.memberProps}>
        <span>
          HP: {Math.max(member.health, 0)} / {member.card.health}
        </span>
        <progress value={member.health / member.card.health} />
      </p>
      {member.card.energy > 0 && (
        <p className={styles.memberProps}>
          <span>
            E: {member.energy} / {member.card.energy}
          </span>
          <progress value={member.energy / member.card.energy} />
        </p>
      )}
    </div>
  );
};
const actionRequiresTarget =
  (type: ActionTarget) =>
  (card: CreatureCard, actionSelection: string): boolean =>
    card.actions.some(
      (a) => a.name === actionSelection && a.targets.includes(type)
    );

const actionRequiresEnemyTarget = actionRequiresTarget("enemy");
const actionRequiresFriendlyTarget = actionRequiresTarget("friendly");

type Props = {
  character: LevelCharacter;
};

const CombatArena: React.FunctionComponent<Props> = ({ character }) => {
  const combatStatus = useAppSelector(selectCombatStatus);
  const combatLog = useAppSelector(selectCombatLog);
  const encounter = useAppSelector(selectActiveEncounter);
  const dispatch = useAppDispatch();

  const [actionSelection, setActionSelection] = useState<string | null>(null);
  const [targetSelection, setTargetSelection] = useState<string | null>(null);
  const [actionFocus, setActionFocus] = useState(0);

  useEffect(() => {
    if (combatStatus.outcome === "lost") {
      const timeoutId = setTimeout(() => {
        dispatch(loseEncounter());
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
    if (combatStatus.outcome === "won") {
      dispatch(completeFight());
    }
  }, [combatStatus.outcome, dispatch]);

  useEffect(() => {
    if (combatStatus.outcome !== "inProgress") {
      const nextFightDetails = character.fights[encounter.fightsFinished];

      if (!nextFightDetails && combatStatus.outcome === "won") {
        const timeoutId = setTimeout(() => {
          dispatch(endEncounter());
          dispatch(winEncounter());
        }, 3000);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [
    combatStatus.outcome,
    encounter.fightsFinished,
    character.fights,
    dispatch,
  ]);

  useEffect(() => {
    setActionSelection(null);
    setTargetSelection(null);
  }, [combatStatus.turn]);

  useEffect(() => {
    if (combatStatus.turn && combatStatus.turn.creature.party === "right") {
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

        const timeoutId = setTimeout(() => {
          dispatch(actionTurn({ action: defensiveAction.name, target }));
          setActionSelection(null);
          setTargetSelection(null);
        }, 3000);
        return () => clearTimeout(timeoutId);
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
                  ? isWeakFor(
                      enemy.card.type,
                      combatStatus.turn.creature.card.type
                    )
                  : false
              );

              if (target) return target.id;
            }
            return result;
          },
          null
        );
        if (target) {
          const timeoutId = setTimeout(() => {
            dispatch(actionTurn({ action: action.name, target }));
            setActionSelection(null);
            setTargetSelection(null);
          }, 3000);
          return () => clearTimeout(timeoutId);
        }
      }
    }
  }, [combatStatus, dispatch]);

  useEffect(() => {
    if (combatStatus.turn?.isStunned) {
      const timeoutId = setTimeout(() => {
        dispatch(actionTurn({ action: "wait", target: "" }));
        setActionSelection(null);
        setTargetSelection(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
    if (actionSelection && targetSelection) {
      dispatch(
        actionTurn({ action: actionSelection, target: targetSelection })
      );
      setActionSelection(null);
      setTargetSelection(null);
      return;
    }
    if (
      actionSelection &&
      !targetSelection &&
      combatStatus.turn &&
      !actionRequiresEnemyTarget(
        combatStatus.turn.creature.card,
        actionSelection
      ) &&
      !actionRequiresFriendlyTarget(
        combatStatus.turn.creature.card,
        actionSelection
      )
    ) {
      const action = combatStatus.turn.actions.find(
        (f) => f.name === actionSelection
      );
      if (!action) return;
      const targetName = action.targets.reduce<string | null>(
        (r, target) => {
          if (r) return r;
          if (target === "self") {
            return combatStatus.turn?.creature.id ?? null;
          }
          return "all";
        },

        null
      );
      if (targetName) {
        dispatch(actionTurn({ action: actionSelection, target: targetName }));
        return;
      }
    }
  }, [actionSelection, targetSelection, dispatch, combatStatus.turn]);

  useEffect(() => {
    if (
      combatStatus.turn &&
      combatStatus.turn.creature.party === "left" &&
      actionSelection === null
    ) {
      const actionIndices = combatStatus.turn.actions.reduce(
        (result, action, index) =>
          action.disabled ? result : result.concat(index),
        [] as number[]
      );

      const keyHandling = (ev: KeyboardEvent) => {
        if (ev.code === "ArrowDown") {
          setActionFocus(
            (state) =>
              actionIndices[
                (actionIndices.indexOf(state) + 1) % actionIndices.length
              ]
          );
        }
        if (ev.code === "ArrowUp") {
          setActionFocus(
            (state) =>
              actionIndices[
                (actionIndices.length + actionIndices.indexOf(state) - 1) %
                  actionIndices.length
              ]
          );
        }
        if ((ev.code === "Space" || ev.code === "Enter") && combatStatus.turn) {
          setActionSelection(combatStatus.turn.actions[actionFocus].name);
          setActionFocus(0);
        }
      };
      window.addEventListener("keydown", keyHandling);
      return () => {
        window.removeEventListener("keydown", keyHandling);
      };
    }

    if (
      combatStatus.turn &&
      combatStatus.turn.creature.party === "left" &&
      actionSelection &&
      targetSelection === null
    ) {
      const party = (
        actionRequiresEnemyTarget(
          combatStatus.turn.creature.card,
          actionSelection
        )
          ? combatStatus.partyB
          : actionRequiresFriendlyTarget(
              combatStatus.turn.creature.card,
              actionSelection
            )
          ? combatStatus.partyA
          : []
      ).filter((a) => a.health > 0);

      const keyHandling = (ev: KeyboardEvent) => {
        if (ev.code === "ArrowDown") {
          setActionFocus((state) => (state + 1) % party.length);
        }
        if (ev.code === "ArrowUp") {
          setActionFocus((state) => (party.length + state - 1) % party.length);
        }
        if ((ev.code === "Space" || ev.code === "Enter") && combatStatus.turn) {
          setTargetSelection(party[actionFocus].id);
          setActionFocus(0);
        }
      };
      window.addEventListener("keydown", keyHandling);
      return () => {
        window.removeEventListener("keydown", keyHandling);
      };
    }
  }, [
    actionSelection,
    combatStatus.turn,
    combatStatus.partyB,
    combatStatus.partyA,
    setActionFocus,
    actionFocus,
    setTargetSelection,
    targetSelection,
  ]);

  return (
    <div className={styles.fightScreen}>
      <div className={styles.log}>
        {combatLog.map((sentence, index) => (
          <CombatLogSentence sentence={sentence} key={index} />
        ))}
        {combatStatus.turn && (
          <p>
            <strong>{combatStatus.turn.creature.card.name}</strong> is aan de
            beurt!
          </p>
        )}
      </div>

      <div className={styles.partyStats}>
        <div className={styles.partyBox}>
          {combatStatus.partyA.map((member) => (
            <MemberStats
              member={member}
              key={member.id}
              inTurn={
                !!(
                  combatStatus.turn &&
                  combatStatus.turn.creature.id === member.id
                )
              }
            />
          ))}
        </div>
        <div className={styles.partyBox}>
          {combatStatus.partyB.map((member) => (
            <MemberStats
              member={member}
              key={member.id}
              inTurn={
                !!(
                  combatStatus.turn &&
                  combatStatus.turn.creature.id === member.id
                )
              }
            />
          ))}
        </div>
      </div>

      {combatStatus.turn &&
        combatStatus.turn.creature.party === "left" &&
        !combatStatus.turn.isStunned &&
        actionSelection === null && (
          <div className={styles.actionsMenu}>
            <h2>Acties</h2>
            <ul>
              {combatStatus.turn.actions.map((action, index) => (
                <li
                  key={action.name}
                  className={className({
                    [styles.focusAction]: index === actionFocus,
                    [styles.disabledAction]: action.disabled,
                  })}
                >
                  <p>
                    <strong>{action.name}</strong>
                  </p>
                  {action.inCooldown > 0 && (
                    <span>(Afkoelen: {action.inCooldown} beurten)</span>
                  )}
                  <p>
                    {action.damage > 0 && action.damageType === undefined
                      ? action.targets.includes("allEnemies")
                        ? `Schade iedereen: ${action.damage}. `
                        : `Schade: ${action.damage}. `
                      : ""}
                    {action.damage > 0 && action.damageType === "stun"
                      ? action.targets.includes("allEnemies")
                        ? `Verdoof iedereen: ${action.damage} beurten. `
                        : `Verdoof: ${action.damage} beurten. `
                      : ""}
                    {action.damage < 0
                      ? action.targets.includes("allFriendlies")
                        ? `Genees iedereen: ${action.damage * -1} HP. `
                        : `Genezing: ${action.damage * -1} HP. `
                      : ""}
                    {action.cooldown > 0
                      ? `Afkoeling: ${action.cooldown} beurten. `
                      : ""}
                    {action.cost > 0 ? `Kosten: ${action.cost} energie.` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      {combatStatus.turn &&
        combatStatus.turn.creature.party === "left" &&
        actionSelection &&
        actionRequiresEnemyTarget(
          combatStatus.turn.creature.card,
          actionSelection
        ) &&
        targetSelection === null && (
          <div className={styles.actionsMenu}>
            <h2>Actie "{actionSelection}" doelwit:</h2>
            <ul>
              {combatStatus.partyB
                .filter((a) => a.health > 0)
                .map((target, index) => (
                  <li
                    key={target.id}
                    className={className({
                      [styles.focusAction]: index === actionFocus,
                    })}
                  >
                    <p>
                      <strong>{target.card.name}</strong>
                    </p>
                    <p>
                      HP: {target.health} / {target.card.health}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      {combatStatus.turn &&
        combatStatus.turn.creature.party === "left" &&
        actionSelection &&
        actionRequiresFriendlyTarget(
          combatStatus.turn.creature.card,
          actionSelection
        ) &&
        targetSelection === null && (
          <div className={styles.actionsMenu}>
            <h2>Actie "{actionSelection}" doelwit:</h2>
            <ul>
              {combatStatus.partyA
                .filter((a) => a.health > 0)
                .map((target, index) => (
                  <li
                    key={target.id}
                    className={className({
                      [styles.focusAction]: index === actionFocus,
                    })}
                  >
                    <p>
                      <strong>{target.card.name}</strong>
                    </p>
                    <p>
                      HP: {target.health} / {target.card.health}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default CombatArena;
