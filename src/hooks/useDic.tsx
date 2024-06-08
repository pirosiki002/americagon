import { useState } from 'react';
import searchDic from './searchDic';

const useDic = (board: string[][], row: number, col: number) => {
  const [verticalQuery, setVerticalQuery] = useState('');
  const [holizontalQuery, setHolizontalQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // 縦と横の英単語が成立しているかチェックし、結果を取得する
  const handleSearch = async () => {
    const res = await searchDic(board, row, col);
    const {words, matches} = res;
    const [verticalWord, horizontalWord] = words;
    setResults(matches);  // 検索結果をセット
    setVerticalQuery(verticalWord);
    setHolizontalQuery(horizontalWord);
  };

  // Enterキーが押されたときの処理
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return {
    verticalQuery,
    setVerticalQuery,
    holizontalQuery,
    setHolizontalQuery,
    results,
    handleSearch,
    handleKeyDown
  };
};

export default useDic;
