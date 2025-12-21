import Gameboard from "./gameboard.js";
import Player from "./player.js";
import createDisplayController from "./displayController.js";

function createGameController() {
  const humanPlayer = new Player("player");
  const computerPlayer = new Player("computer");
  const display = createDisplayController();

  setBoards();

  function setBoards() {
    humanPlayer.setBoard(new Gameboard());
    computerPlayer.setBoard(new Gameboard());
  }

  function displayBoards() {
    display.displayBoard(humanPlayer.board);
    display.displayBoard(computerPlayer.board);
  }

  return { displayBoards };
}

export default createGameController;
