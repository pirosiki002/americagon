import styles from "src/styles/Home.module.css";
import useDic from "../hooks/useDic";

const Dic = (props: {board: string[][], row: number, col: number}) => {
  const {board, col, row} = props;
  // const { query, setQuery, results, handleSearch, handleKeyDown } = useDic();
  const { query, setQuery, results, handleSearch, handleKeyDown } = useDic(board, row, col);
  return (
    <div>
      <input
        type="text"
        placeholder="英語の単語を入力"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.inputField}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        検索
      </button>
      <ul className={styles.resultsList}>
        <h1>{query}</h1>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dic;
