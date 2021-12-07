document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    { row: 0, col: 0, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 1, col: 0, isMine: false, hidden: true, surroundingMines: 3 },
    { row: 2, col: 0, isMine: false, hidden: true},
    { row: 0, col: 1, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 1, col: 1, isMine: false, hidden: true},
    { row: 2, col: 1, isMine: false, hidden: true},
    { row: 0, col: 2, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 1, col: 2, isMine: false, hidden: true },
    { row: 2, col: 2, isMine: false, hidden: true },
  ]}

  console.log(board.cells)

  let random_boolean = () => Math.random() < 0.3;
  
  
  var board = createBoard(5, 5);
  
  
  function createBoard(rows, cols) {
    var newBoard = {
      cells: [],
    };
  
    let positionInArray = 0;
    for (let row = 0; row < rows; row++) {

      newBoard.cells.push({ row: row, col: 0, isMine:random_boolean(), hidden: true });
      positionInArray++;
      for (let col = 1; col < cols; col++) {
        newBoard.cells.push({ row: row, col: col, isMine:random_boolean(), hidden:true });
        positionInArray++;
      }
    }
    console.log(newBoard);
    return newBoard;
  }
  



function startGame () {
  for(let cell of board.cells){
    cell.surroundingMines = countSurroundingMines(cell)    
  }
    document.addEventListener('click', checkForWin);
    document.addEventListener('contextmenu', checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
const hasNoMine = board.cells.filter(cell => cell.isMine !== true)

for (let i = 0; i < board.cells.length; i++) {
  if (board.cells[i].isMine == true) {
    if (board.cells[i].isMarked == true) {
      for (let j = 0; j < hasNoMine.length; j++) {
        if (hasNoMine[j].hidden == true) {
          return
        }
      }
    }
    else {
      return;
    }
  }
}
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  // return lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
 
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  let mineCount=0;
  for (let surroundingCell of surroundingCells){
    if(surroundingCell.isMine){
      mineCount++
    }
  }
  return mineCount
}