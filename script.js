const gameBoard = (function() {
    let rows = 3;
    let columns = 3;
    let board = [];

    for (let a = 0; a < rows; a++) {
        board.push([]);
        for (let b = 0; b < columns; b++) {
            board[a].push(0);
        }
    }

    const getBoard = () => board;

    const makeMove = function(row, col, player) {
        let cell = board[row][col];

        if (cell == 0) {
            board[row][col] = player;
            console.log(board);
        }
        else if (cell != 0) {
            return;
        }
    } 

    return {
        getBoard,
        makeMove
    }
})(); 