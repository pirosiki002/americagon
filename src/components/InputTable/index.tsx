import InputRow from "src/components/InputRow";
import styles from "src/components/InputTable/InputTable.module.css";

type InputTableProps = {
  size: number;
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  onCellClick: (row: number, col: number) => void;
  inputCells: {row: number, col: number}[]; // 追加
};

const InputTable: React.FC<InputTableProps> = ({ size, board, setBoard, onCellClick, inputCells}) => {

  // これまでに入力されたすべてのセルを追跡
  const isAdjacentToAnyInputCell = (currentRow: number, currentCol: number): boolean => {
    for (let cell of inputCells) {
      if (isAdjacentCell(currentRow, currentCol, cell.row, cell.col)) {
        return true;
      }
    }
    return false;
  };

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

    if (inputCells.length > 0 && !isAdjacentToAnyInputCell(rowIndex, colIndex)) {
      // すでに入力されたセルがあり、現在のセルがそれらのいずれかの隣接セルでない場合、入力を無視する
      return;
    }

    // 入力セルを追跡
    onCellClick(rowIndex, colIndex);

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
