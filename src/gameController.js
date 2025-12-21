import Gameboard from "./gameboard.js";
import Player from "./player.js";
import createDisplayController from "./displayController.js";

function createGameController() {
  const humanPlayer = new Player("player", new Gameboard());
  const computerPlayer = new Player("computer", new Gameboard());
  const display = createDisplayController();
  placeShips(humanPlayer);
  placeShips(computerPlayer);

  function placeShips(player) {
    player.board.placeShip(5, 0, 0, "horizontal");
    player.board.placeShip(4, 2, 2, "horizontal");
    player.board.placeShip(3, 4, 4, "vertical");
    player.board.placeShip(3, 6, 6, "horizontal");
    player.board.placeShip(2, 6, 8, "vertical");
  }

  function displayBoards() {
    display.displayBoard(humanPlayer.board);
    display.displayBoard(computerPlayer.board);
  }

  return { displayBoards };
}

export default createGameController;
