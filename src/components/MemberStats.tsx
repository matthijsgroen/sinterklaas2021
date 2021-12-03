import React from "react";
import { CombatCreature } from "../state/combatSlice";
import Icon from "./Icon";
import styles from "./MemberStats.module.css";
import ProgressBar from "./ProgressBar";

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
        transition: "opacity 2s",
        opacity: member.health > 0 ? 1 : 0.5,
        background: inTurn ? "#333" : "#000",
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
        <ProgressBar
          value={member.health / member.card.health}
          color={"#4c4"}
        />
      </p>
      {member.card.energy > 0 && (
        <p className={styles.memberProps}>
          <span>
            E: {member.energy} / {member.card.energy}
          </span>
          <ProgressBar
            value={member.energy / member.card.energy}
            color={"#44f"}
          />
        </p>
      )}
    </div>
  );
};

export default MemberStats;
