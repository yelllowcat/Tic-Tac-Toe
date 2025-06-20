const gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getboard = () => board;

  const selectIndex = (i, mark) => (board[i] = mark);
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
      acutalBoard[0] != null && //horizontals
      acutalBoard[1] != null &&
      acutalBoard[2] != null &&
      acutalBoard[3] != null && //horizontals
      acutalBoard[4] != null &&
      acutalBoard[5] != null &&
      acutalBoard[6] != null && //horizontals
      acutalBoard[7] != null &&
      acutalBoard[8] != null
    ) {
      return "Tie";
    }
  };

  return { selectIndex, getboard, winner, tie };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

function gameLoop(player1, player2) {
  let currentPlayer = player1;

  const makeMove = (index) => {
    gameboard.selectIndex(index, currentPlayer.mark);
    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  return { makeMove };
}
const david = createPlayer("david", "x");
const pepe = createPlayer("pepe", "o");

const game = gameLoop(david, pepe);
game.makeMove(0);
game.makeMove(5);
game.makeMove(1);
game.makeMove(6);
game.makeMove(2);
game.makeMove(7);
game.makeMove(3);
game.makeMove(8);
game.makeMove(4);

console.log(gameboard.getboard());
console.log(gameboard.winner("x"));
console.log(gameboard.winner("o"));
console.log(gameboard.tie());

const container = document.querySelector(".container");
gameboard.getboard().forEach((element) => {});
