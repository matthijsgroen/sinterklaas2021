import React, { useState, useEffect } from "react";
import className from "../className";
import {
  actionTurn,
  CombatCreature,
  selectCombatLog,
  selectCombatStatus,
} from "../state/combatSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { ActionTarget, CreatureCard, CreatureType } from "../types";
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
  return (
    <div>
      <p>
        <strong>
          {inTurn ? "➡️ " : ""}
          {member.card.name}
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

const CombatArena: React.FunctionComponent = () => {
  const combatStatus = useAppSelector(selectCombatStatus);
  const combatLog = useAppSelector(selectCombatLog);
  const dispatch = useAppDispatch();

  const [actionSelection, setActionSelection] = useState<string | null>(null);
  const [targetSelection, setTargetSelection] = useState<string | null>(null);
  const [actionFocus, setActionFocus] = useState(0);

  useEffect(() => {
    setActionSelection(null);
    setTargetSelection(null);
  }, [combatStatus.turn]);

  useEffect(() => {
    if (combatStatus.turn?.creature.party === "right") {
      // handle enemy action!

      // weak team mates? heal!

      // max offence!
      const offensiveAction = combatStatus.turn.actions
        .filter((a) => !a.disabled)
        .sort((a, b) => b.damage - a.damage)[0];
      if (offensiveAction) {
        const target = offensiveAction.targets.reduce<null | string>(
          (result, targetType) => {
            if (targetType === "maxHealth") {
              const target = combatStatus.partyA.reduce((r, current) =>
                current.health > r.health ? current : r
              );
              return target.id;
            }
            return result;
          },
          null
        );
        if (target) {
          const timeoutId = setTimeout(() => {
            dispatch(actionTurn({ action: offensiveAction.name, target }));
            setActionSelection(null);
            setTargetSelection(null);
          }, 3000);
          return () => clearTimeout(timeoutId);
        }
      }
    }
  }, [combatStatus, dispatch]);

  useEffect(() => {
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
            (state) => actionIndices[(state + 1) % actionIndices.length]
          );
        }
        if (ev.code === "ArrowUp") {
          setActionFocus(
            (state) =>
              actionIndices[
                (actionIndices.length + state - 1) % actionIndices.length
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
      const party = actionRequiresEnemyTarget(
        combatStatus.turn.creature.card,
        actionSelection
      )
        ? combatStatus.partyB
        : actionRequiresFriendlyTarget(
            combatStatus.turn.creature.card,
            actionSelection
          )
        ? combatStatus.partyA
        : [];

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
    <div>
      <h1>Gevecht</h1>

      {combatLog.map((sentence, index) => (
        <CombatLogSentence sentence={sentence} key={index} />
      ))}
      {combatStatus.turn && (
        <p>
          <strong>{combatStatus.turn.creature.card.name}</strong> is aan de
          beurt!
        </p>
      )}

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
        actionSelection === null && (
          <div>
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
                    <span>(in cooldown: {action.inCooldown} turns)</span>
                  )}
                  <p>
                    {action.damage > 0 ? `Damage: ${action.damage} ` : ""}
                    {action.damage < 0 ? `Healing: ${action.damage * -1} ` : ""}
                    {action.cooldown > 0 ? `Cooldown: ${action.cooldown} ` : ""}
                    {action.cost > 0 ? `Cost: ${action.cost} E` : ""}
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
          <div>
            <h2>Actie "{actionSelection}" doelwit:</h2>
            <ul>
              {combatStatus.partyB.map((target, index) => (
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
          <div>
            <h2>Actie "{actionSelection}" doelwit:</h2>
            <ul>
              {combatStatus.partyA.map((target, index) => (
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
