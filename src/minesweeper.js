class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this.board[rowIndex][columnIndex] == 'B'){
      console.log('Game Over mate!');
      this._board.print();
    }
    else if (!this._board.hasSafeTiles()){
      console.log('Congrats, mate, you WON the game!');
    }
    else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}

class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberofTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if(this._playerBoard[rowIndex][columnIndex] != ' '){
      console.log("This tile has already been flipped!");
      return;
    }
    else if(this._bombBoard[rowIndex][columnIndex] == 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs
      (rowIndex, columnIndex);
    }
    this._numberofTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    let neighborOffsets = [];
    for (var i = 0; i < 8; i++) {
      neighborOffsets.push([]);
    }
    neighborOffsets = [
      [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    console.log(this._bombBoard);
    let numberOfBombs = 0;
    neighborOffsets.forEach(function(offset){
      let neighborRowIndex = rowIndex + offset[0];
      let neighborColumnIndex = columnIndex + offset[1];
      if ((neighborRowIndex >= 0 ) && (neighborRowIndex <= numberOfRows) &&
      (neighborColumnIndex >= 0) && (neighborColumnIndex <= numberOfColumns)){
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          this._numberOfBombs++;
        }
      }
    });
    return this._numberOfBombs;
  }

  hasSafeTiles(){
    return (this._numberOfTiles != this._numberOfBombs);
  }
  print(){
    this._board.forEach(function(item){
      console.log(item.join(' | '));
    });
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [] ;
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let i = 0; i < numberOfColumns; i++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [] ;
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let i = 0; i < numberOfColumns; i++) {
        row.push(' ');
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0 ;
    while (numberOfBombsPlaced < numberOfBombs) {
      //it can still add bombs on top of other bombs, fix later
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] == 'B'){
        continue;
      }
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
    return board;
  }
}





const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  let neighborOffsets = [];
  for (var i = 0; i < 8; i++) {
    neighborOffsets.push([]);
  }
  neighborOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(function(offset){
    let neighborRowIndex = rowIndex + offset[0];
    let neighborColumnIndex = columnIndex + offset[1];
    if ((neighborRowIndex >= 0 ) && (neighborRowIndex <= numberOfRows) &&
    (neighborColumnIndex >= 0) && (neighborColumnIndex <= numberOfColumns)){
      if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
}

// let board = generatePlayerBoard(4, 5);
// let bombBoard = generateBombBoard(4, 5, 9);
// console.log('\nPlayboard:\n');
// printBoard(board);
// console.log('\nBombboard:\n');
// printBoard(bombBoard);
//
// flipTile(board, bombBoard, 0, 0);
// console.log('Updated Player Board:');
// printBoard(board);

const g = new Game(3, 3, 3);
g.playMove(0, 0);
