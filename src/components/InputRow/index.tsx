import React from "react";
import InputCell from "src/components/InputCell";
import styles from "src/components/InputCell/InputCell.module.css";

type InputRowProps = {
  rowIndex: number;
  rowData: string[];
  onCellChange: (colIndex: number, value: string) => void;
};

const InputRow: React.FC<InputRowProps> = ({
  rowIndex,
  rowData,
  onCellChange,
}) => {
  return (
    <div className={styles.row}>
      {rowData.map((cellValue, colIndex) => (
        <InputCell
          col={colIndex}
          row={rowIndex}
          key={colIndex}
          value={cellValue}
          onChange={(value) => onCellChange(colIndex, value)}
        />
      ))}
    </div>
  );
};

export default InputRow;
