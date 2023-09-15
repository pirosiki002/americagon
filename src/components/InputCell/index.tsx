import React from "react";
import styles from "src/components/InputCell/InputCell.module.css";

type InputCellProps = {
  row: number;
  col: number;
  value: string;
  onChange: (value: string) => void;
};

const InputCell: React.FC<InputCellProps> = ({ row, col, value, onChange }) => {
  const inputName = `input-cell-${row}-${col}`;

  return (
    <input
      name={inputName}
      value={value}
      maxLength={1}
      onChange={(e) => onChange(e.target.value)}
      className={styles.input}
    />
  );
};

export default InputCell;
