import React from "react";
import InputRow from "src/components/InputRow";
import styles from "src/components/InputTable/InputTable.module.css";

type InputTableProps = {
  size: number;
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
};

const InputTable: React.FC<InputTableProps> = ({ size, board, setBoard }) => {

  // セルが変更されたときの処理
  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = value;
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      {/* テーブルを作成 */}
      {board.map((rowData, rowIndex) => (
        <InputRow
          key={rowIndex}
          rowIndex={rowIndex}
          rowData={rowData}
          handleCellChange={handleCellChange}
        />
      ))}
    </div>
  );
};

export default InputTable;
