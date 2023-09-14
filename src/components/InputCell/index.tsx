import React from "react";
import styles from "src/components/InputCell/InputCell.module.css";

type InputCellProps = {
  value: string;
  onChange: (value: string) => void;
};

const InputCell: React.FC<InputCellProps> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      maxLength={1}
      onChange={(e) => onChange(e.target.value)}
      className={styles.input}
    />
  );
};

export default InputCell;
