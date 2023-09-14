import React from "react";
import styles from "./ResetButton.module.css";

type Props = {
  onReset: () => void;
};

const ResetButton: React.FC<Props> = ({ onReset }) => {
  return (
    <button onClick={onReset} className={styles.button}>
      Reset
    </button>
  );
};

export default ResetButton;
