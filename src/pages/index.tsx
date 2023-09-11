import useDic from '../hooks/useDic';

const SearchDic = () => {
  const { query, setQuery, results, handleSearch, handleKeyDown} = useDic();

  return (
    <div>
      <input
        type="text"
        placeholder="英語の単語を入力"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>検索</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDic;
