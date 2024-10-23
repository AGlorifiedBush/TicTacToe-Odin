(function() {

    var gbObj = {

        gameboard: ["", "", "", "", "", "", "", "", ""],
        players: [],
        currentPlayerIndex: 0,
        endGame: false, 

        init: function(){
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        cacheDom: function(){
            this.startBtn = document.getElementById("startBtn");
            this.gb = document.getElementById("game-board");
            this.restart = document.getElementById("restart");
            this.player1 = document.getElementById("player1").value;
            this.player2 = document.getElementById("player2").value;
        },

        bindEvents: function(){
            this.startBtn.addEventListener("click", this.startGame);
            //this.resartBtn.addEventListener("click", this.restartGame)
        },

        render: function(){
            this.gb.append(this.gameboard);
            
        },

        buildGb: function(){
            let gbHTML = ""
            this.gameboard.forEach((cell, index) => {
                boardHTML += `<div class="cell" id=cell-${index}>${cell}</div>`
            })
            gbObj.render();
        },

        createPlayer: function(name, symbol){
            return {
                name,
                symbol
            }
        },

        startGame: function(){
            let players = [
                this.createPlayer(this.player1, "X"),
                this.createPlayer(this.player2, "O")
            ]

            this.buildGb()
        },
        
    
    };

    gbObj.init()

}) ()

//May be a good Idea to build the board seperate from the array then find a way to connect space in the board to the array