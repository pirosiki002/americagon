import useDictionarySearch from '../hooks/useDictionarySearch';

const Home = () => {
  const { query, setQuery, results, handleSearch } = useDictionarySearch();

  return (
    <div>
      <input
        type="text"
        placeholder="英語の単語を入力"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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

export default Home;
