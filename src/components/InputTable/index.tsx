import React from "react";
import InputRow from "src/components/InputRow";
import styles from "src/components/InputTable/InputTable.module.css";

type InputTableProps = {
  size: number;
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
};

const InputTable: React.FC<InputTableProps> = ({ size, board, setBoard }) => {
  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = value.substr(0, 1);
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      {board.map((rowData, rowIndex) => (
        <InputRow
          key={rowIndex}
          rowIndex={rowIndex}
          rowData={rowData}
          onCellChange={(colIndex, value) =>
            handleCellChange(rowIndex, colIndex, value)
          }
        />
      ))}
    </div>
  );
};

export default InputTable;
