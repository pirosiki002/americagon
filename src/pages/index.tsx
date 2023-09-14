// pages/index.tsx

import InputTable from "../components/inputTable";
import styles from "./index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>America Gon</h1>
      <InputTable size={4} />
    </div>
  );
}
