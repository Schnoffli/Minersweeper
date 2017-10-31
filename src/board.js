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
    for (let i = 0; i < 8; i++) {
      neighborOffsets.push([]);
    }
    neighborOffsets = [
      [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(function(offset){
      let neighborRowIndex = rowIndex + offset[0];
      let neighborColumnIndex = columnIndex + offset[1];
      if ((neighborRowIndex >= 0 ) && (neighborRowIndex < numberOfRows) &&
      (neighborColumnIndex >= 0) && (neighborColumnIndex < numberOfColumns)){
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          numberOfBombs++;
        }
      }
    }, this); //here add "this" so the forEach loops knows understand the reference.
    return numberOfBombs;
  }

  hasSafeTiles(){
    return (this._numberOfTiles != this._numberOfBombs);
  }
  print(){
    this._playerBoard.forEach(function(item){
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

export {Board};
