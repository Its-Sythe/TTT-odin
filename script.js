let player1;
let player2;
let round = 1;

const game = (function() {
    let gameOver = false;
    let currentPlayer = "X";
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const getBoard = () => board;

    const getPlayers = function(name, mark) {
        return {
            name, mark
        }
    }

    const switchPlayer = function() {
        return currentPlayer = (currentPlayer === "X") ? "O" : "X";
    };

    const incrementRound = function() {
        round++
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

        switchPlayer();

        let gameState = validateTable();

        if (gameState.state == "Win" || gameState.state == "Tie") {
            endRound(gameState);
            return gameState;
        }
    }

    const endRound = function(state) {
        gameOver = true;  
    }

    const resetGame = function() {
        board = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];
        currentPlayer = "X";
        gameOver = false;
    }

    return {
        getBoard,
        validateTable,
        playRound,
        getPlayers,
        resetGame,
        incrementRound
    }
})();

const gameUi = (function() {
    const rounds = document.getElementById("rounds");
    const getPlayer = game.getPlayers;
    const restartBtn = document.getElementById("restartBtn");
    const resetBtn = document.getElementById("resetBtn");
    const startBtn = document.getElementById("playBtn");
    const tableSpace = document.querySelector(".tableSpace");
    const form = document.querySelector(".playerSelection");
    const submitBtn = document.getElementById("submit");

    rounds.innerHTML = `Round: ${round}`

    const validateForm = function(e) {
        e.preventDefault();

        let playersForm = document.forms["playerForm"]
        player1 = getPlayer(playersForm["player1Name"].value || "Player 1", playersForm["player1Mark"].value || "X");
        player2 = getPlayer(playersForm["player2Name"].value || "Player 2", playersForm["player2Mark"].value || "O")

        form.style.display = "none";

        tableSpace.style.display = "flex";
    }

    const playGame = function(e) {
        if(restartBtn.style.display === "flex" || resetBtn.style.display === "flex") {
            return;
        }

        let tgt = e.target;

        if (tgt.className != "cell") {
            return;
        }

        const board = game.getBoard();

        
        let result = game.playRound(tgt.id);
        tgt.innerHTML = board[tgt.id];

        if (!result) {
            return;
        }

        if (result.state === "Win") {
            if (result.mark === player1.mark) {
                console.log(`${player1.name} wins!`)
            } else if (result.mark === player2.mark) {
                console.log(`${player2.name} wins!`)
            }
            restartBtn.style.display = "flex";
            resetBtn.style.display = "flex";
        } else if (result.state === "Tie") {
            console.log("Its a tie!");
            restartBtn.style.display = "flex";
            resetBtn.style.display = "flex";
        }
    }

    const resetUi = function() {
        let cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.innerHTML = "";
        })
    }

    startBtn.addEventListener("click", function() {
        form.style.display = "flex";
        startBtn.remove();
    })

    tableSpace.addEventListener("click", function(e) {
        playGame(e)
    });

    submitBtn.addEventListener("click", validateForm);

    restartBtn.addEventListener("click", function() {
        game.resetGame();
        resetUi();
        restartBtn.style.display = "none";
        game.incrementRound();
        rounds.innerHTML = `Round: ${round}`
    })

    resetBtn.addEventListener("click", function() {
        game.resetGame();
        resetUi();
        resetBtn.style.display = "none";
        round = 1;
        rounds.innerHTML = `Round: ${round}`
    })
})();