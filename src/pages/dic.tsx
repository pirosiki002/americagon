import styles from "src/styles/Home.module.css";
import useDic from "../hooks/useDic";

const Dic = () => {
  const { query, setQuery, results, handleSearch, handleKeyDown } = useDic();

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
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dic;
