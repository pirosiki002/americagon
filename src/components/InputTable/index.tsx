import { on } from "events";
import React from "react";
import InputRow from "src/components/InputRow";
import styles from "src/components/InputTable/InputTable.module.css";

type InputTableProps = {
  size: number;
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  onCellClick: (row: number, col: number) => void;
  lastInputCell: { row: number; col: number } | null;  // ここを修正
};

const InputTable: React.FC<InputTableProps> = ({ size, board, setBoard, onCellClick, lastInputCell}) => {

  // 隣接するセルかどうかを判定する関数
  const isAdjacentCell = (
    currentRow: number,
    currentCol: number,
    lastRow: number,
    lastCol: number
  ): boolean => {
    return (
      (currentRow === lastRow && Math.abs(currentCol - lastCol) === 1) ||
      (currentCol === lastCol && Math.abs(currentRow - lastRow) === 1)
    );
  };

  // セルが変更されたときの処理
  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    // 入力値が半角英字（a-z）であることを確認
    if (!/^[a-z]+$/.test(value)) {
      // 入力値が半角英字でない場合、入力を無視する
      return;
    }

    if (lastInputCell !== null) {
      const { row: lastRow, col: lastCol } = lastInputCell;
      if (!isAdjacentCell(rowIndex, colIndex, lastRow, lastCol)) {
        // 最後に入力したセルの上下左右にない場合、入力を無視する
        return;
      }
    }

    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = value;
    setBoard(newBoard);
    onCellClick(rowIndex, colIndex);
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
