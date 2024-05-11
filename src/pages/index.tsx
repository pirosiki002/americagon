import React, { useState } from "react";
import InputTable from "src/components/InputTable";
import ResetButton from "../components/ResetButton";
import styles from "./index.module.css";

// 盤面の初期化
const createInitialBoard = (size: number) => {
  return Array(size)
    .fill("")
    .map(() => Array(size).fill(""));
};

// TODO:英単語が成立しているかをチェック
function useWordCheck(board: string[][]): boolean {
  // Perform the word check here and return the result

  return true;
}


// テーブルを表示している大元のコンポーネント
export default function Home() {

  const size = 4;
  const [board, setBoard] = useState(createInitialBoard(size));  // useStateを使って盤面の状態を管理。値を更新するたびに再描画する
  console.log(board);  // ログはブラウザに表示

  // リセットボタンを押したときの処理
  const handleReset = () => {
    setBoard(createInitialBoard(size));
  };

  // 単語が有効かどうかをチェック
  const isWordValid = useWordCheck(board);

  return (
    <div className={styles.container}>
      <h1>America Gon</h1>
      <InputTable size={size} board={board} setBoard={setBoard} />
      <ResetButton onReset={handleReset} />
      <p>English word here</p>
    </div>
  );
}
