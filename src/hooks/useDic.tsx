import { useState } from 'react';
import searchDic from './searchDic';

const useDic = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    const res = await searchDic(query);
    setResults(res);
  };

  return {
    query,
    setQuery,
    results,
    handleSearch
  };
};

export default useDic;
