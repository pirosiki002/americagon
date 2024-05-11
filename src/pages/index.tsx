import React, { useState, useEffect } from "react";
import InputTable from "src/components/InputTable";
import ResetButton from "../components/ResetButton";
import styles from "./index.module.css";
import useDic from "../hooks/useDic";
import searchDic from '../hooks/searchDic';

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
  return "heart";
};


// テーブルを表示している大元のコンポーネント
export default function Home() {
  // 辞書機能を使うために、useDic.tsxからの処理を呼び出す
  const { query, setQuery, results, handleSearch, handleKeyDown } = useDic();

  const [generatedWord, setGeneratedWord] = useState(generateWord());

  useEffect(() => {
    setQuery(generatedWord);
    handleSearch();
  }, [generatedWord]);

  // 文字列が更新されるたびに検索を行う
  useEffect(() => {
    handleSearch();
  }, [query]);

  const size = 4;
  const [board, setBoard] = useState(createInitialBoard(size));  // useStateを使って盤面の状態を管理。値を更新するたびに再描画する
  console.log(board);  // ログはブラウザに表示

  // リセットボタンを押したときの処理
  const handleReset = () => {
    // setBoard(createInitialBoard(size));
    setGeneratedWord('');
    setBoard(createInitialBoard(size));
  };

  // 単語が有効かどうかをチェック
  const isWordValid = useWordCheck(board);

  // 単語を生成
  const dispWord = generateWord();
  return (
    <div className={styles.container}>
      <h1>America Gon</h1>
      <InputTable size={size} board={board} setBoard={setBoard} />
      <ResetButton onReset={handleReset} />
      <p>English word here</p>
      <div>
      {/* <input
        type="text"
        placeholder="英語の単語を入力"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.inputField}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        検索
      </button> */}
      <ul className={styles.resultsList}>
        <h1>{query}</h1>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>

    </div>
  );
}
