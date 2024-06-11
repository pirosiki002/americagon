import React, { useState, useEffect } from "react";
import InputTable from "src/components/InputTable";
import ResetButton from "../components/ResetButton";
import styles from "./index.module.css";
import useDic from "../hooks/useDic";

// 盤面の状態を管理する
const BOARD_SIZE = 7;

// 盤面の初期化
const createInitialBoard = (size: number) => {
  return Array(size)
    .fill("")
    .map(() => Array(size).fill(""));
};

// テーブルを表示している大元のコンポーネント
export default function Home() {
  // 辞書機能を使うために、useDic.tsxからの処理を呼び出す
  const size = BOARD_SIZE;
  const [board, setBoard] = useState(createInitialBoard(size));  // useStateを使って盤面の状態を管理。値を更新するたびに再描画する
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);

  // マスを選択または入力したときに呼び出される関数
  const handleSelectCell = (row: number, col: number) => {
    setSelectedRow(row);
    setSelectedCol(col);
  };

  const { verticalQuery, setVerticalQuery, holizontalQuery, setHolizontalQuery, results, handleSearch} = useDic(board, selectedRow, selectedCol);

  // これまでに入力されたすべてのセルを追跡
  const [inputCells, setInputCells] = useState<{row: number, col: number}[]>([]);

  // セルがクリックされたときのコールバック関数
  const handleCellClick = (row: number, col: number) => {
    // テーブル全体にセットして盤面全体を管理する
    setInputCells([...inputCells, { row, col }]);
    // 現在位置をセット。テーブル全体と比較して、単語が成立しているかどうかをチェックするために必要
    handleSelectCell(row, col);
  };

  // boardの状態が更新されるたびに、その内容をqueryに設定し、辞書検索を行う
  useEffect(() => {
    const word = board.flat().join('');
    // 縦だけでOK。
    setVerticalQuery(word);
    handleSearch();
  }, [board]);

  // リセットボタンを押したときの処理
  const handleReset = () => {
    setInputCells([]); // inputCellsをリセット
    setBoard(createInitialBoard(size));
  };

  return (
    <div className={styles.container}>
      <h1>Pirorin Game</h1>
      <InputTable size={size} board={board} setBoard={setBoard}  onCellClick={handleCellClick}  inputCells={inputCells} />
      <ResetButton onReset={handleReset} />
      <p>English word here</p>
      <h2>Col：{verticalQuery}</h2>
      <li>{results.vertical}</li>
      <h2>Row：{holizontalQuery}</h2>
      <li>{results.horizontal}</li>
    </div>
  );
}
