type SearchDicResult = {
  word: string;
  matches: string[];
}

const searchDic = async (board: string[][], row: number, col: number): Promise<SearchDicResult> => {
    const response = await fetch('/kantan-ej-dictionary.json');
  const data = await response.json();

  // // 辞書データからクエリに一致する単語を検索
  // if (data[query]) {
  //   return data[query].ja;
  // }
  // return [];

  console.log('searchDic', board, row, col);

  // 上から下へ単語を構成
  // 現在の位置から1マス上に戻って、上からチェックする必要がある。
  // 上に言葉があれば、さらにその上に行く。言葉がなくなるまでこれを繰り返す。
  // 言葉がなくなったら、その位置が最上部となる。この位置から現在位置までに成立する単語がないかを探す
  // boardに盤面全体のコードが入っている。あとは現在位置が取得できればOK!
  // let verticalWord = '';
  // for (let i = 0; i < board.length; i++) {
  //   verticalWord += board[i][col];

  // }

  // 上から下まで、文字がある端の位置を格納する。関数化したほうが良い。start *******************

  // まず現在位置を取得
  const currentCol = col; // 列
  const currentRow = row; // 行

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

  console.log('verticalHighPosition=', verticalHighPosition);


  let verticalLowPosition = row;

  console.log('board[row].length=', board[row].length);
  console.log('board[col].length=', board[col].length);
  console.log('board.length=', board.length);
  // 現在位置から１マス下をチェックする
  for(let i=row; i < board[row].length; i++){
    // もし値が入っていなかったら、その時点でループを抜ける
    if(!(board[i][col])){
      break;//ループを抜ける
    }
    // 現時点で一番上の位置を保持しておく
    verticalLowPosition = i;
  }

  console.log('verticalHighPosition=', verticalHighPosition);
  console.log('verticalLowPosition=', verticalLowPosition);


  // 上から下まで、文字がある端の位置を格納する。関数化したほうが良い。end *******************


  // 文字列を連結。関数化を検討したほうが良いかも。
  // (i < rowでいったん現在位置までを確認。本来は一番下まで確認しないといけない)

  let verticalWord = '';

  for(let i =verticalHighPosition; i <= verticalLowPosition; i++){
    verticalWord += board[i][col];
  }

  console.log('created verticalWord=', verticalWord);

  // 現在位置から上だけでなく、下もチェックしないといけないね。
  // 文字が入っている一番上の位置と、一番下の位置を覚えて、端から端までを連結する必要がある。

  // 左から右へ単語を構成する場合も、上下と同様に対応する。こりゃ大変だぁ。

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
