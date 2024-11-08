const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        let gbHTML = "";
        board.forEach((cell, index) => {
            gbHTML += `<div class="cell" id="cell-${index}">${cell}</div>`
        });
        document.querySelector("#game-board").innerHTML = gbHTML;
        const cells = document.querySelectorAll(".cell")
        cells.forEach((cell) =>{
            cell.addEventListener("click", Game.makeMove);
        })
    }

    const update = (index, value) => {
        board[index] = value;
        render();
    }

    const checkGameboard = () => board;

    return {
        render,
        update,
        checkGameboard,
    }
})();

const createPlayer = (name, symbol) => {
    return {
        name,
        symbol
    }
}

const displayController = (() => {
    const displayResults = (results) => {
        document.getElementById("results").innerHTML = results;
    }
    return {
        displayResults
    }
})();

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameEnd;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = 0;
        gameEnd = false;
        Gameboard.render();
        const cells = document.querySelectorAll(".cell")
        cells.forEach((cell) =>{
            cell.addEventListener("click", makeMove);
        })
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        Gameboard.render();
        gameEnd = false;
        document.getElementById("results").innerHTML = "";
    }

    const makeMove = (event) => {
        if (gameEnd) {
            return;
        }

        let index = parseInt(event.target.id.split("-")[1]);
        if(Gameboard.checkGameboard()[index] !== "") {
            return
        }

        Gameboard.update(index, players[currentPlayerIndex].symbol)

        if (checkForWin(Gameboard.checkGameboard(), players[currentPlayerIndex].symbol)) {
            gameEnd = true;
            displayController.displayResults(`${players[currentPlayerIndex].name} is the winner!`)
        } else if (checkForTie(Gameboard.checkGameboard())) {
            gameEnd = true
            displayController.displayResults("Looks like it's a draw...")
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }    

    return {
        start,
        restart,
        makeMove,
    }

})();

function checkForTie(endBoard) {
    return endBoard.every(cell => cell !== "")
}

function checkForWin(endBoard) {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i=0; i < winCombos.length; i++) {
        const [a, b, c] = winCombos[i];
        if (endBoard[a] && endBoard[a] === endBoard[b] && endBoard[a] === endBoard[c]) {
            return true;
        }
    }
    return false;
}

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
    Game.start();
})

const restartBtn = document.getElementById("restartBtn")
restartBtn.addEventListener("click", () => {
    Game.restart();
})