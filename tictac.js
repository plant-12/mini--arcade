var grid = document.getElementById('grid');
var msg = document.querySelector('.message');
var chooser = document.querySelector('form');
var mark;
var cells;
var gameOver = false;
var totalWins = parseInt(localStorage.getItem('totalPoints')) || 0;;
var resetButton;

function initializeTotalPoints() {
  updateAndStorePoints(totalWins);
}

// add click listener to radio buttons
function setPlayer() {
  mark = this.value;
  msg.textContent = mark + ', click on a square to make your move!';
  chooser.classList.add('game-on');
  this.checked = false;
  buildGrid();
}

// add click listener to each cell
function playerMove() {
  if (!gameOver && this.textContent == '') {
    this.textContent = mark;
    if (checkWinner()) {
      gameOver = true;
      updateTotalPoints(mark);
      return; // exit function early if the game is won
    }
    switchMark();
    setTimeout(computerMove, 200);
  }
}

// let the computer make the next move
function computerMove() {
  if (!gameOver) {
    var emptyCells = cells.filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
      var random = Math.floor(Math.random() * emptyCells.length);
      emptyCells[random].textContent = mark;
      if (checkWinner()) {
        gameOver = true;
        return; // exit function early if the game is won
      }
      switchMark();
    }
  }
}

// switch player mark
function switchMark() {
  mark = mark === 'X' ? 'O' : 'X';
}
// determine a winner
function checkWinner() {
    return (
      checkRow('c1', 'c2', 'c3') ||
      checkRow('c4', 'c5', 'c6') ||
      checkRow('c7', 'c8', 'c9') ||
      checkRow('c1', 'c4', 'c7') ||
      checkRow('c2', 'c5', 'c8') ||
      checkRow('c3', 'c6', 'c9') ||
      checkRow('c1', 'c5', 'c9') ||
      checkRow('c3', 'c5', 'c7')
    );
  }

// check cell combinations 
function checkRow(id1, id2, id3) {
  var cell1 = document.getElementById(id1);
  var cell2 = document.getElementById(id2);
  var cell3 = document.getElementById(id3);

  if (cell1.textContent !== '' && cell1.textContent === cell2.textContent && cell2.textContent === cell3.textContent) {
    msg.textContent = cell1.textContent + ' is the winner!';
    cell1.classList.add('winner');
    cell2.classList.add('winner');
    cell3.classList.add('winner');
    return true;
  }

  return false;
}

// clear the grid
function resetGrid() {
  var resetButton = document.getElementById('reset');
  resetButton.classList.add('hidden');

  // Remove focus from the button
  resetButton.blur();
  mark = 'X';
  cells.forEach(function (cell) {
      cell.textContent = '';
      cell.classList.remove('winner');
  });
  msg.textContent = 'Choose your player:';
  chooser.classList.remove('game-on');
  grid.innerHTML = '';
  gameOver = false;
  document.getElementById('points').textContent = 'Points: ' + totalWins;
}



// build the grid
function buildGrid() {
  for (var i = 1; i <= 9; i++) {
    var cell = document.createElement('li');
    cell.id = 'c' + i;
    cell.addEventListener('click', playerMove, false);
    grid.appendChild(cell);
  }
  cells = Array.from(grid.getElementsByTagName('li'));
  resetButton.addEventListener('click', resetGrid, false);
  resetButton.classList.remove('hidden');
  gameOver = false;
}

function updateTotalPoints(winnerMark) {
    if (winnerMark === mark) {
        totalWins += 5;
        updateAndStorePoints(totalWins);
    }
}

function updateAndStorePoints(points) {
    localStorage.setItem('totalPoints', points);
    document.getElementById('points').textContent = 'Points: ' + points;
}

var players = Array.from(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function (choice) {
  choice.addEventListener('click', setPlayer, false);
});

var resetButton = chooser.querySelector('button');
resetButton.addEventListener('click', function (e) {
  e.preventDefault();
  resetGrid();
});

initializeTotalPoints();