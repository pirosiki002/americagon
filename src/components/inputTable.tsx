// components/inputTable.tsx

import { useState } from "react";
import styles from "./inputTable.module.css";

type Props = {
  size?: number;
};

const InputTable: React.FC<Props> = ({ size = 4 }) => {
  const initialBoard = Array(size)
    .fill("")
    .map(() => Array(size).fill(""));

  const [board, setBoard] = useState(initialBoard);

  const handleInputChange = (
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
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              value={cell}
              maxLength={1}
              onChange={(e) =>
                handleInputChange(rowIndex, colIndex, e.target.value)
              }
              className={styles.input}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default InputTable;
