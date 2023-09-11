import { useState } from 'react';

const Dictionary = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    const response = await fetch('/kantan-ej-dictionary.json');
    const data = await response.json();

    if (data[query]) {
      setResults(data[query].ja);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Please English words"
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

export default Dictionary;
