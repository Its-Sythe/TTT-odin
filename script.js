const game = (function() {
    let gameboard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const getBoard = () => gameboard;

    const makeMove = function(c, option) {
        if (gameboard[c] == "") {
            gameboard[c] = option
        } else {
            return;
        }
    }

    const validateTable = function() {
        // Row validation
        if (gameboard[0] == gameboard[1] && gameboard[0] == gameboard[2] && gameboard[0] != "") {
            console.log("Match won at row 1");
            return "Match won";
        } else if (gameboard[3] == gameboard[4] && gameboard[3] == gameboard[5] && gameboard[3] != "") {
            console.log("Match won at row 2");
            return "Match won";
        } else if (gameboard[6] == gameboard[7] && gameboard[6] == gameboard[8] && gameboard[6] != "") {
            console.log("Match won at row 3");
            return "Match won";
        }
        // Column Validation
        if (gameboard[0] == gameboard[3] && gameboard[0] == gameboard[6] && gameboard[0] != "") {
            console.log("Match won at col 1");
            return "Match won";
        } else if (gameboard[1] == gameboard[4] && gameboard[1] == gameboard[7] && gameboard[1] != "") {
            console.log("Match won at col 2");
            return "Match won";
        } else if (gameboard[2] == gameboard[5] && gameboard[2] == gameboard[8] && gameboard[2] != "") {
            console.log("Match won at col 3");
            return "Match won";
        }

        if  (gameboard[0] == gameboard[4] && gameboard[0] == gameboard[8] && gameboard[0] != "") {
            console.log("Match won at diag");
            return "Match won";
        } else if (gameboard[2] == gameboard[4] && gameboard[2] == gameboard[6] && gameboard[2] != "") {
            console.log("Match won at diag");
            return "Match won";
        }

        if (!gameboard.includes("")) {
            console.log("Match has been tied");
            return "Match tied";
        }
    }

    const playRound = function(slot, option) {
        gameUi.addClick();
        makeMove(slot, option);
        let gameState = validateTable();

        if (gameState == "Match won" || gameState == "Match tied") {
            endRound();
        } else {
            makeMove(slot, option);
        }

    }

    const endRound = function()  {
        setTimeout(() => {
            gameboard = [
                "", "", "",
                "", "", "",
                "", "", ""
            ];
            gameUi.resetUi();
            }, 1000);    
        }

    return {
        getBoard,
        playRound
    }
})();


const gameUi = (function() {
    let cells = document.querySelectorAll(".cell");
    let board = game.getBoard();

    const addClick = function() {
        for (let a = 0; a < 9; a++) {
            let cell = cells[a];
            cell.addEventListener("click", () => {
                game.playRound(cell.id, "X");
                cell.innerHTML = board[a];
            })
        }
    }

    const resetUi = function() {
        for (let b = 0; b < 9; b++) {
            cells[b].innerHTML = ""
        }
    }

    return {
        addClick,
        resetUi
    }
})();

