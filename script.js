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
        }
        else if (cell != 0) {
            return;
        }
    }

    // board[1][0] = "X"; board[1][1] = "X"; board[1][2] = "X";

    board[0][2] = "O"; board[1][2] = "O"; board[2][2] = "O"
    board[0][1] = "O"; board[1][1] = "O"; board[2][1] = "O"

    const validateTable = function() {
        //Row validation
        if (board[0][0] == board[0][1] && board[0][0] == board[0][2] && board[0][0] != 0) {
            return `Match won at row 1 by ${board[0][0]}`;
        } else if (board[1][0] == board[1][1] && board[1][0] == board[1][2] && board[1][0] != 0) {
            return `Match won at row 2 by ${board[1][0]}`;
        } else if (board[2][0] == board[2][1] && board[2][0] == board[2][2] && board[2][0] != 0) {
            return `Match won at row 3 by ${board[2[0]]}`;
        }
        //Column validation
        if (board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] != 0) {
            return `Match won at column 1 by ${board[0][0]}`;
        } else if (board[0][1] == board[1][1] && board[0][1] == board[2][1] && board[0][1] != 0) {
            return `Match won at column 2 by ${board[0][1]}`;
        } else if (board[0][2] == board[1][2] && board[0][2] == board[2][2] && board[0][2] != 0) {
            return `Match won at column 3 by ${board[0][2]}`;
        }
        //Diagonal validation
        if (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != 0) {
            return `Match won at daigonal by ${board[0][0]}`;
        } else if (board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] != 0) {
            return `Match won at diagonal by ${board[0][2]}`;
        }
    }

    return {
        getBoard,
        makeMove,
        validateTable
    }
})(); 