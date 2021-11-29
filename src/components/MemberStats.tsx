import React from "react";
import { CombatCreature } from "../state/combatSlice";
import { CreatureType } from "../types";
import Icon from "./Icon";
import styles from "./MemberStats.module.css";

type MemberProps = {
  member: CombatCreature;
  inTurn: boolean;
};

const MemberStats: React.FunctionComponent<MemberProps> = ({
  member,
  inTurn,
}) => {
  const stunned =
    member.cooldowns["stunned"] && member.cooldowns["stunned"] > 0;
  return (
    <div
      style={{
        opacity: member.health > 0 ? 1 : 0.5,
        background: inTurn ? "#222" : "#000",
        padding: "0.5em",
      }}
    >
      <p style={{ color: member.party === "left" ? "lightgreen" : "white" }}>
        <strong>
          <Icon symbol={member.card.type} /> {member.card.name}
          {stunned && "🌪"}
          {inTurn ? "️ ⬅️" : ""}
        </strong>
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
          <progress
            className={styles.energyBar}
            value={member.energy / member.card.energy}
          />
        </p>
      )}
    </div>
  );
};

export default MemberStats;
