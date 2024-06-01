type SearchDicResult = {
  word: string;       // 検索キーワード（暫定で縦文字列のみ返している）
  matches: string[];  // 辞書で見つかった文字列（暫定で縦文字列のみ返している）
}

// 縦列の位置
type VerticalPositionsResult = {
  top: number;      // 縦の一番高い位置情報
  bottom: number;   // 縦の一番低い位置情報
}

/**
 * 縦列の上下端の位置を取得する
 * @param {string[][]} board 盤面の配列
 * @param {number} row 現在の行の位置
 * @param {number} col 現在の列の位置
 * @returns {Promise<VerticalPositionsResult>} 縦列の端の位置情報
*/
const getVerticalTopBottomPosition = (board: string[][], row:number, col:number):Promise<VerticalPositionsResult> =>{
  // 上下の一番端を記憶するためのローカル変数
  let verticalHighPosition = row;

  // 現在位置から１マス上をチェックする
  for(let i=row; i >= 0; i--){
    // もし値が入っていなかったら、その時点でループを抜ける
    if(!(board[i][col])){
      break;//ループを抜ける
    }
    // 現時点で一番上の位置を保持しておく
    verticalHighPosition = i;
  }

  let verticalLowPosition = row;

  // 現在位置から１マス下をチェックする
  for(let i=row; i < board[row].length; i++){
    // もし値が入っていなかったら、その時点でループを抜ける
    if(!(board[i][col])){
      break;//ループを抜ける
    }
    // 現時点で一番上の位置を保持しておく
    verticalLowPosition = i;
  }

  const result: VerticalPositionsResult = {
    top:verticalHighPosition,
    bottom:verticalLowPosition,
  }
  return Promise.resolve(result);
}


/**
 * 辞書検索を行う
 * @param {string[][]} board 盤面の配列
 * @param {number} row 行の番号
 * @param {number} col 列の番号
 * @returns {Promise<SearchDicResult>} 検索結果
 */
const searchDic = async (board: string[][], row: number, col: number): Promise<SearchDicResult> => {
  const response = await fetch('/kantan-ej-dictionary.json');
  const data = await response.json();

  const resultVerticalTopBottomPosition = await getVerticalTopBottomPosition(board, row, col);
  console.log(resultVerticalTopBottomPosition.top);
  console.log(resultVerticalTopBottomPosition.bottom);

  // 文字列を連結。関数化を検討したほうが良いかも。start******************

  let verticalWord = '';

  for(let i =resultVerticalTopBottomPosition.top; i <= resultVerticalTopBottomPosition.bottom; i++){
    verticalWord += board[i][col];
  }

  // 文字列を連結。関数化を検討したほうが良いかも。end ******************

  // TODO: 左から右へ単語を構成する場合も、上下と同様に対応する。こりゃ大変だぁ。

  // 単語が辞書に存在するかチェック
  const verticalMatches = data[verticalWord] ? data[verticalWord].ja : [];
  // const horizontalMatches = data[horizontalWord] ? data[horizontalWord].ja : [];

  // 一致する単語と、辞書の意味を戻り値で返す
  return {
    word: verticalWord,
    matches: [...verticalMatches],
  };
};

export default searchDic;
