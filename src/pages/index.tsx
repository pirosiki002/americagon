import React, { useState } from "react";
import InputTable from "src/components/InputTable";
import ResetButton from "../components/ResetButton";
import styles from "./index.module.css";

const createInitialBoard = (size: number) => {
  return Array(size)
    .fill("")
    .map(() => Array(size).fill(""));
};

// テーブルを表示している大元のコンポーネント
export default function Home() {

  const size = 4;
  const [board, setBoard] = useState(createInitialBoard(size));  // useStateを使って盤面の状態を管理。値を更新するたびに再描画する
  console.log(board);  // ログはブラウザに表示

  // リセットボタンを押したときの処理
  const handleReset = () => {
    setBoard(createInitialBoard(size));
  };

  return (
    <div className={styles.container}>
      <h1>America Gon</h1>
      <InputTable size={size} board={board} setBoard={setBoard} />
      <ResetButton onReset={handleReset} />
    </div>
  );
}
