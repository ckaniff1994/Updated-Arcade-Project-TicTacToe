let initialState = {};

const gameState = {
    players: ['x', 'o'],
    board : [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    
}

function buildInitialState() {
    initialState.players = 'X';
    initialState.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    initialState.currentPlayer = ['', '']
    initialState.currentPlayerIndex = 0;
    initialState.getCurrentPlayer = function (){
        return initialState.currentPlayer[initialState.currentPlayerIndex];
    }
    initialState.lastTurnIndex = -1;
    initialState.tie = false;
    
}

//DOM Selectors
const boardElement = document.getElementById('board')
const playerTurnElement = document.getElementById('player-turn')
const winElement = document.getElementById('win')
const restartElement = document.querySelector('.restart-button')

function randomComputerMove () {
    column = Math.floor(Math.random() * initialState.board.length);
    row = Math.floor(Math.random() * initialState.board.length);
    return [row, column];
}

function changeXO() {
    
    if (initialState.players == 'X') {
        initialState.players = 'O';
    } else {
        initialState.players = 'X'
    }
}

function changeTurn() {
    if (initialState.currentPlayerIndex === 0) {
        initialState.currentPlayerIndex = 1;
    } else {
        initialState.currentPlayerIndex = 0;
    }
}

function renderBoard() {
    boardElement.innerHTML = "";
    for (let i = 0; i < initialState.board.length; i++){
        for (let j = 0; j < initialState.board.length; j++) {
        const card = initialState.board[i][j];
        const cellElement = document.createElement('div');
        cellElement.innerText = card;
        cellElement.classList.add('cell');
        cellElement.dataset.index = `${[i]},${[j]}`;
        boardElement.appendChild(cellElement);
        }
    }
}

function renderPlayer() {

    let text;
    if (!initialState.currentPlayer[0] && !initialState.currentPlayer[1]){
        text = `
            <input name="player1" placeholder="Input Player One">
            <input name="player2" placeholder="Input Player Two">
            <button class="start-button">Start Game</button>
        `
    } else if(initialState.currentPlayer[0] && !initialState.currentPlayer[1]){
        initialState.currentPlayer[1] = 'Computer'
        text = `It's currently ${initialState.getCurrentPlayer()}'s turn.
        
        `
    } else {
        text = `It's currently ${initialState.getCurrentPlayer()}'s turn.    `
    }

    const theWin = winner(initialState.board);
    if(theWin !== null){
        text = `
        <button class="restart-button">Restart</button>
        `
    } 

    playerTurnElement.innerHTML = text;
}

function winner(board) {
    const lines = [
      board[0], // rows 
      board[1],
      board[2],
      [board[0][0], board[1][0], board[2][0]], // cols
      [board[0][1], board[1][1], board[2][1]], 
      [board[0][2], board[1][2], board[2][2]], 
      [board[0][0], board[1][1], board[2][2]], // diags
      [board[0][2], board[1][1], board[2][0]]
    ];
    const winningLine = lines.find(line => line.every(c => c && c === line[0]))
    
    return winningLine ? winningLine[0] : null
    
  }
  
function renderWin() {
    
    win = winElement.innerHTML = `
        ${initialState.getCurrentPlayer()} wins!.
        
    `
    
}

function renderTie() {
    
    draw = winElement.innerHTML = `
        It's a Draw!!!!
        <button class="restart-button>Restart</button>
    `
}

function render() {
    renderBoard();
    renderPlayer();
    
}

function takeTurns(cellIndex) {
    if (!initialState.currentPlayer[0] || !initialState.currentPlayer[1]) {
        return;
    }

    const [row, column] = cellIndex;
    if (initialState.currentPlayer[1] === 'Computer' && initialState.currentPlayerIndex === 1){
        setTimeout(() => {
            initialState.board[row][column].innerText = initialState.players;
        }, 2000);
    } else {
        initialState.board[row][column] = initialState.players;
    }
    const theWin = winner(initialState.board);
    
    if (theWin !== null) {
        renderWin();

        
    } else if(theWin === null) {
          renderTie();
     }
    changeTurn();
    changeXO();
    render();
} 

boardElement.addEventListener('click', function(event){
    if(event.target.className === 'cell') {
        const cellIndex = event.target.dataset.index;
        let [row, column] = cellIndex.split(',');
        console.log('click');
            takeTurns([row, column]);
        
        
        render();
    }
})

playerTurnElement.addEventListener('click', function(event){
    if (event.target.className === 'start-button'){
        const player1Input = document.querySelector('input[name=player1]');
        const player2Input = document.querySelector('input[name=player2]');
        initialState.currentPlayer[0] = player1Input.value;
        initialState.currentPlayer[1] = player2Input.value;
        render();
    } else if(event.target.className === 'restart-button'){
        console.log('here');
        winElement.innerHTML = '';
        buildInitialState();
        render();
    } else {
        return;
    }

   
})


buildInitialState();
render();
