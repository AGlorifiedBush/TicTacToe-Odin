(function() {

    var gbObj = {

        gameboard: [], 

        init: function(){
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        cacheDom: function(){
            this.startBtn = document.getElementById("startBtn");
            this.gb = document.getElementById("game-board");
            this.template = document.getElementById("template")
        },

        bindEvents: function(){
            this.startBtn.addEventListener("click", this.buildGb);
            
        },

        render: function(){
            this.gb.append(this.gameboard);
            
        },

        buildGb: function(){
            for (let i=0; i < 9; i++) {
              let cell = this.template
              //push not working trying to figure out why
               this.gameboard.push(cell)

            }
            gbObj.render();
        },
    };

    gbObj.init()

}) ()

//May be a good Idea to build the board seperate from the array then find a way to connect space in the board to the array