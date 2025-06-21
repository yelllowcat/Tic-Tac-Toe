const gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getboard = () => board;

  const selectIndex = (i, mark) => {
    if (board[i] == "") {
      board[i] = mark;
    }
  };
  const winner = (mark) => {
    const acutalBoard = gameboard.getboard();
    if (
      acutalBoard[0] == mark && //horizontals
      acutalBoard[1] == mark &&
      acutalBoard[2] == mark
    ) {
      return mark;
    }
    if (
      acutalBoard[3] == mark &&
      acutalBoard[4] == mark &&
      acutalBoard[5] == mark
    ) {
      return mark;
    }
    if (
      acutalBoard[6] == mark &&
      acutalBoard[7] == mark &&
      acutalBoard[8] == mark
    ) {
      return mark;
    }
    if (
      acutalBoard[0] == mark && //verticals
      acutalBoard[3] == mark &&
      acutalBoard[6] == mark
    ) {
      return mark;
    }
    if (
      acutalBoard[1] == mark &&
      acutalBoard[4] == mark &&
      acutalBoard[7] == mark
    ) {
      return mark;
    }
    if (
      acutalBoard[2] == mark &&
      acutalBoard[5] == mark &&
      acutalBoard[8] == mark
    ) {
      return mark;
    }
    if (
      acutalBoard[0] == mark && //diagonals
      acutalBoard[4] == mark &&
      acutalBoard[8] == mark
    ) {
      return mark;
    }
    if (
      acutalBoard[2] == mark &&
      acutalBoard[4] == mark &&
      acutalBoard[6] == mark
    ) {
      return mark;
    }
  };
  const tie = () => {
    const acutalBoard = gameboard.getboard();
    if (
      acutalBoard[0] != "" &&
      acutalBoard[1] != "" &&
      acutalBoard[2] != "" &&
      acutalBoard[3] != "" &&
      acutalBoard[4] != "" &&
      acutalBoard[5] != "" &&
      acutalBoard[6] != "" &&
      acutalBoard[7] != "" &&
      acutalBoard[8] != ""
    ) {
      return "Tie";
    }
  };
  const resetBoard = () => {
    if (tie) {
      const acutalBoard = gameboard.getboard();
      acutalBoard[0] = "";
      acutalBoard[1] = "";
      acutalBoard[2] = "";
      acutalBoard[3] = "";
      acutalBoard[4] = "";
      acutalBoard[5] = "";
      acutalBoard[6] = "";
      acutalBoard[7] = "";
      acutalBoard[8] = "";
    }
  };

  return { selectIndex, getboard, winner, tie, resetBoard };
})();

const container = document.querySelector(".container");

function createPlayer(name, mark) {
  return { name, mark };
}

function gameLoop(player1, player2) {
  let currentPlayer = player2;
  const getCurrentPlayer = () => currentPlayer;
  const makeMove = (index) => {
    gameboard.selectIndex(index, currentPlayer.mark);
    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  return { makeMove, getCurrentPlayer };
}

function domLogic(game) {
  const render = () => {
    gameboard.getboard().forEach((element, i) => {
      const divs = document.createElement("div");
      divs.style.width = "10vh";
      divs.style.height = "10vh";
      divs.style.border = "5px solid black";
      divs.style.display = "flex";
      divs.style.justifyContent = "center";
      divs.style.alignItems = "center";
      divs.textContent = element;
      divs.style.fontSize = "45px";
      divs.classList.add("divs");
      divs.id = i;

      divs.style.backgroundColor = "gray";

      container.appendChild(divs);
    });
  };
  const playerMark = () => {
    const divsDom = document.querySelectorAll(".divs");
    divsDom.forEach((div) => {
      div.addEventListener("click", function () {
        if (gameboard.getboard()[div.id] == "") game.makeMove(div.id);
        div.textContent = game.getCurrentPlayer().mark;

        if (gameboard.winner(gameboard.getboard()[div.id])) {
          alert(game.getCurrentPlayer().name + " wins");
          gameboard.resetBoard();
          divsDom.forEach((element) => {
            element.textContent = "";
          });
        }
        if (gameboard.tie()) {
          gameboard.resetBoard();
          divsDom.forEach((element) => {
            element.textContent = "";
          });
        }
      });
    });
  };
  return { render, playerMark };
}

const startButton = document.querySelector(".start");
const dialog = document.querySelector("dialog");
const inputName = document.querySelector(".name");
const inputName2 = document.querySelector(".name2");
const closeButton = document.querySelector(".close");
const submitButton = document.querySelector(".submit");
const header1 = document.querySelector(".player1");
const header2 = document.querySelector(".player2");
const turn = document.querySelector("h2");

startButton.addEventListener("click", () => {
  dialog.showModal();
});
closeButton.addEventListener("click", () => {
  inputName.value = "";
  inputName2.value = "";
  dialog.close();
});

let names = [];
names = submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  david.name = inputName.value;
  pepe.name = inputName2.value;
  header1.textContent = inputName.value;
  header2.textContent = inputName2.value;

  dialog.close(inputName.value, inputName2.value);
  inputName.value = "";
  inputName2.value = "";
});
console.log(names);
const david = createPlayer("namePlayer1", "x");
const pepe = createPlayer("namePlayer2", "o");

const game = gameLoop(david, pepe);

const dom = domLogic(game);
dom.render();
dom.playerMark(game.currentPlayer);
