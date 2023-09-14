import React, { useState } from "react";
import InputTable from "src/components/InputTable";
import ResetButton from "../components/ResetButton";
import styles from "./index.module.css";

const createInitialBoard = (size: number) => {
  return Array(size)
    .fill("")
    .map(() => Array(size).fill(""));
};

export default function Home() {
  const size = 4;
  const [board, setBoard] = useState(createInitialBoard(size));

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
