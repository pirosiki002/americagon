import { useState } from 'react';
import searchDic from './searchDic';

const useDic = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    const res = await searchDic(query);
    setResults(res);
  };

  // Enterキーが押されたときの処理
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return {
    query,
    setQuery,
    results,
    handleSearch,
    handleKeyDown
  };
};

export default useDic;
