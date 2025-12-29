import Gameboard from "./gameboard.js";
import Player from "./player.js";
import createDisplayController from "./displayController.js";

function createGameController() {
  const humanPlayer = new Player("You", new Gameboard());
  const computerPlayer = new ComputerPlayer(new Gameboard());
  const display = createDisplayController();

  function startGame() {
    placeShips(humanPlayer);
    placeShips(computerPlayer);
    displayBoards();
    display.addAttackListener(handleTurn);
  }

  function placeShips(player) {
    player.board.placeShip(5, 0, 0, "horizontal");
    player.board.placeShip(4, 2, 2, "horizontal");
    player.board.placeShip(3, 4, 4, "vertical");
    player.board.placeShip(3, 6, 6, "horizontal");
    player.board.placeShip(2, 6, 8, "vertical");
  }

  function displayBoards() {
    display.displayBoard(humanPlayer.board);
    display.displayBoard(computerPlayer.board, true);
  }

  function handleTurn(x, y) {
    const hit = computerPlayer.board.receiveAttack(x, y);
    const sunk = isShipSunk(x, y);
    displayBoards();
    display.displayMessage(hit, sunk);
  }

  function isShipSunk(x, y) {
    const ship = computerPlayer.board.squareAt(x, y);
    if (!ship) return;

    return ship.isSunk;
  }

  return { startGame };
}

export default createGameController;
