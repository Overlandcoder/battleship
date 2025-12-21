import Gameboard from "./gameboard.js";
import Player from "./player.js";
import DisplayController from "./displayController.js";

function GameController() {
  const humanPlayer = new Player("player");
  const computerPlayer = new Player("computer");

  setBoards();

  function setBoards() {
    humanPlayer.setBoard(new Gameboard());
    computerPlayer.setBoard(new Gameboard());
  }

  function displayBoards() {
    DisplayController().displayBoard(humanPlayer.board);
    DisplayController().displayBoard(computerPlayer.board);
  }

  return { displayBoards };
}

export default GameController;
