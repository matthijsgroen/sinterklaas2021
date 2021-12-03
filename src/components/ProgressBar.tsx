import React from "react";
import styles from "./ProgressBar.module.css";

type Props = {
  value: number;
  color: string;
};

const ProgressBar: React.FunctionComponent<Props> = ({ value, color }) => (
  <div className={styles.bar}>
    <div
      className={styles.progress}
      style={{ width: `${Math.max(value, 0) * 100}%`, backgroundColor: color }}
    />
  </div>
);

export default ProgressBar;
