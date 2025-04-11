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

        if (!board[0].includes(0) && !board[1].includes(0) && board[2].includes(0)) {
            return `Its a tie`;
        }
    }

    return {
        getBoard,
        makeMove,
        validateTable
    }
})();

const gameController = (function () {

    function playRound() {
        let board = gameBoard.getBoard();
        let userRow = prompt("1 to 3");
        let userCol = prompt("1 to 3");

        userRow = Number(userRow) - 1;
        userCol = Number(userCol) - 1;
        
        gameBoard.makeMove(userRow, userCol, "X");
    }

    return {
        playRound
    }
})();
