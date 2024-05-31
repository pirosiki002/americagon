import { useState } from 'react';
import searchDic from './searchDic';

const useDic = (board: string[][], row: number, col: number) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    const res = await searchDic(board, row, col);
    const {word, matches} = res;
    setResults(matches);  // 検索結果をセット
    setQuery(word);
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
