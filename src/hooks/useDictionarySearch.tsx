import { useState } from 'react';
import searchDictionary from '../hooks/searchDictionary';

const useDictionarySearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    const res = await searchDictionary(query);
    setResults(res);
  };

  return {
    query,
    setQuery,
    results,
    handleSearch
  };
};

export default useDictionarySearch;
