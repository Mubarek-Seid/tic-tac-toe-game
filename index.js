
// Gameboard module
const Gameboard = (function () {

    let board = ["", "", "", "", "", "", "", "", ""];

    function getBoard() {
        return board;
    }

    function markSquare(index, marker) {
        board[index] = marker;
    }

    function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    return {
        getBoard,
        markSquare,
        resetBoard
    };

})();


// Factory function
function makePlayer(name, marker) {

    return {
        name,
        marker
    };

}


// Game Controller
const GameController = (function () {

    const players = [];
    let currentPlayer;
    let gameOver = false;

    function setPlayers(player1 = "Player 1", player2 = "Player 2") {

        players[0] = makePlayer(player1, "X");
        players[1] = makePlayer(player2, "O");

        currentPlayer = players[0];
        gameOver = false;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function switchTurn() {

        currentPlayer =
            currentPlayer === players[0]
            ? players[1]
            : players[0];

    }


    function checkWinner() {

        const board = Gameboard.getBoard();

        const winningCombinations = [

            [0,1,2],
            [3,4,5],
            [6,7,8],

            [0,3,6],
            [1,4,7],
            [2,5,8],

            [0,4,8],
            [2,4,6]

        ];


        for (let combo of winningCombinations) {

            let [a,b,c] = combo;

            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {

                return true;
            }
            else{
                console.log(
                    "No winner in combination: " +
                    combo
                );
            }

        }

        return false;
    }
function checkDraw(){

    const board = Gameboard.getBoard();

    return !board.includes("");

}


    function PlayRound(index) {

        if (gameOver) return null;

        Gameboard.markSquare(
            index,
            currentPlayer.marker
        );


        console.log(
            currentPlayer.name +
            " played at " +
            index
        );


        if (checkWinner()) {

            gameOver = true;

            return currentPlayer.name + "wins!";

        }

        if (checkDraw()) {

            gameOver = true;

            return "It's a draw!";

        }


        switchTurn();

        return null;

    }


    return {

        setPlayers,
        getCurrentPlayer,
        PlayRound,
        checkWinner

    };

})();



// Display Controller
const DisplayController = (function () {

    const cells =
    document.querySelectorAll(".container div");


    function renderBoard() {

        const board =
        Gameboard.getBoard();


        for (
            let i = 0;
            i < board.length;
            i++
        ) {

            cells[i].textContent =
            board[i];

        }

    }



    function ClickListeners() {

        cells.forEach(

            (cell,index)=>{

                cell.addEventListener(

                    "click",

                    ()=>{

                        if (
                            cell.textContent === ""
                        ) {

                            let winner =
                            GameController
                            .PlayRound(index);


                            renderBoard();


                            if (winner) {

    document
    .getElementById("winner")
    .textContent =
    winner;

}

                        }

                    }

                );

            }

        );

    }



document
.getElementById("reset")
.addEventListener(

    "click",

    ()=>{

        Gameboard.resetBoard();

        GameController.setPlayers();

        document
        .getElementById("winner")
        .textContent = "";


        renderBoard();

    }

);



return {

    renderBoard,
    ClickListeners

};

})();



GameController.setPlayers();

DisplayController.renderBoard();

DisplayController.ClickListeners();