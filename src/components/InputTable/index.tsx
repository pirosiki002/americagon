// components/inputTable.tsx
import styles from "./InputTable.module.css";

type InputTableProps = {
  size: number;
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
};

const InputTable: React.FC<InputTableProps> = ({ size, board, setBoard }) => {
  const initialBoard = Array(size)
    .fill("")
    .map(() => Array(size).fill(""));

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
