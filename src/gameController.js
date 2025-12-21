import Gameboard from "./gameboard.js";
import Player from "./player.js";
import createDisplayController from "./displayController.js";

function createGameController() {
  const humanPlayer = new Player("player", new Gameboard());
  const computerPlayer = new Player("computer", new Gameboard());
  const display = createDisplayController();

  function displayBoards() {
    display.displayBoard(humanPlayer.board);
    display.displayBoard(computerPlayer.board);
  }

  return { displayBoards };
}

export default createGameController;
