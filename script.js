const game = (function() {
    let gameOver = false;
    let currentPlayer = "X";
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const getBoard = () => board;

    const switchPlayer = function() {
        return currentPlayer = (currentPlayer === "X") ? "O" : "X";
    };

    const getCurrentPlayer = function(who) {
        currentPlayer = who
    }

    const validateTable = function() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (board[a] === board[b] && board[a] === board[c] && board[a] != "") {
                return {
                    state: "Win",
                    mark: board[a],
                    combo: pattern
                }
            }
        }

        if (!board.includes("")) {
            return {
                state: "Tie"
            }
        }

        return {
            state: "Playing"
        }
    }

    const playRound = function(slot) {
        if (gameOver == true) {
            return;
        }
        if (board[slot] != "") {
            return;
        }
        
        board[slot] = currentPlayer;

        let gameState = validateTable();

        if (gameState.state == "Win" || gameState.state == "Tie") {
            resetGame()
            endRound(gameState);
            return;
        }
    }

    const endRound = function(state) {
        console.log(state.state, state.mark, state.combo);
        gameOver = true;   
    }

    const resetGame = function() {
        board = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];
        gameOver = false;
    }

    return {
        getBoard,
        validateTable,
        playRound
    }
})();