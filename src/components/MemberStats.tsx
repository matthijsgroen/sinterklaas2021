import React from "react";
import { CombatCreature } from "../state/combatSlice";
import { CreatureType } from "../types";
import styles from "./MemberStats.module.css";

const iconMap: Record<CreatureType, string> = {
  shoe: "✂️",
  bag: "📄",
  rod: "🪨",
};

const iconFor = (name: CreatureType): string => iconMap[name];

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
