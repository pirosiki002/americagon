import React, { useState, useEffect } from "react";
import InputTable from "src/components/InputTable";
import ResetButton from "../components/ResetButton";
import styles from "./index.module.css";
import useDic from "../hooks/useDic";

// 盤面の状態を管理する
const BOARD_SIZE = 10;

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

// 単語を生成する
const generateWord = () => {
  // Perform the word generation here
  return "";
};


// テーブルを表示している大元のコンポーネント
export default function Home() {
  // 辞書機能を使うために、useDic.tsxからの処理を呼び出す
  const { query, setQuery, results, handleSearch, handleKeyDown } = useDic();
  const [generatedWord, setGeneratedWord] = useState(generateWord());
  const size = BOARD_SIZE;
  const [board, setBoard] = useState(createInitialBoard(size));  // useStateを使って盤面の状態を管理。値を更新するたびに再描画する
  // 最後に入力したセルの位置を状態として保持
  const [lastInputCell, setLastInputCell] = useState<{ row: number; col: number } | null>(null);

  console.log(lastInputCell);

  // セルがクリックされたときのコールバック関数
  const handleCellClick = (row: number, col: number) => {
    setLastInputCell({ row, col });
  };

  // boardの状態が更新されるたびに、その内容をqueryに設定し、辞書検索を行う
  useEffect(() => {
    const word = board.flat().join('');
    setQuery(word);
    handleSearch();
  }, [board]);


  useEffect(() => {
    setQuery(generatedWord);
    handleSearch();
  }, [generatedWord]);

  // 文字列が更新されるたびに検索を行う
  useEffect(() => {
    handleSearch();
  }, [query]);

  // リセットボタンを押したときの処理
  const handleReset = () => {
    setGeneratedWord('');   // 入力した文字をすべてリセット
    setLastInputCell(null); // lastInputCellをリセット
    setBoard(createInitialBoard(size));
  };

  // 単語が有効かどうかをチェック
  const isWordValid = useWordCheck(board);

  // 単語を生成
  const dispWord = generateWord();
  return (
    <div className={styles.container}>
      <h1>America Gon</h1>
      <InputTable size={size} board={board} setBoard={setBoard}  onCellClick={handleCellClick}  lastInputCell={lastInputCell}/>
      <ResetButton onReset={handleReset} />
      <p>English word here</p>
      <ul className={styles.resultsList}>
        <h1>{query}</h1>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}
