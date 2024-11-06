const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        let gbHTML = "";
        gameboard.forEach((cell, index) => {
            gbHTML += `<div class="cell" id="cell-${index}">${cell}</div>`
        });
        document.querySelector("#game-board").innerHTML = gbHTML;
        const cells = document.querySelectorAll(".cell")
        cells.forEach((cell) =>{
            cell.addEventListener("click", Game.makeMove);
        })
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const checkGameboard = () => gameboard;

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
    }

    const makeMove = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        if(Gameboard.checkGameboard()[index] !== "") {
            return
        }
        Gameboard.update(index, players[currentPlayerIndex].symbol)
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    return {
        start,
        restart,
        makeMove,
    }

})();

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
    Game.start();
})

const restartBtn = document.getElementById("restartBtn")
restartBtn.addEventListener("click", () => {
    Game.restart();
})