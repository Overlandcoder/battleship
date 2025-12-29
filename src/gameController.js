import Gameboard from "./gameboard.js";
import { ComputerPlayer, Player } from "./player.js";
import createDisplayController from "./displayController.js";

function createGameController() {
  const humanPlayer = new Player("You", new Gameboard());
  const computerPlayer = new ComputerPlayer(new Gameboard());
  const display = createDisplayController();
  let currentPlayer = humanPlayer;

  function startGame() {
    placeShips(humanPlayer);
    placeShips(computerPlayer);
    displayBoards();
    display.addAttackListener(handlePlayerTurn);
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

  function handlePlayerTurn(x, y) {
    if (currentPlayer === computerPlayer) return;

    launchAttack(computerPlayer, x, y);
    endTurn();
  }

  function endTurn() {
    if (isGameOver()) {
      display.displayWinner(currentPlayer.name);
      return;
    }

    currentPlayer = switchTurn();

    if (currentPlayer === computerPlayer) {
      setTimeout(makeComputerAttack, 1000);
    }
  }

  function switchTurn() {
    return currentPlayer === humanPlayer ? computerPlayer : humanPlayer;
  }

  function makeComputerAttack() {
    const { x, y } = computerPlayer.generateAttack(humanPlayer.board);
    launchAttack(humanPlayer, x, y);
    endTurn();
  }

  function launchAttack(targetPlayer, x, y) {
    const hit = targetPlayer.board.receiveAttack(x, y);
    const sunk = targetPlayer.board.isShipSunk(x, y);
    displayBoards();
    display.displayMessage(hit, sunk, currentPlayer.name);
  }

  function isGameOver() {
    return (
      computerPlayer.board.allShipsSunk() || humanPlayer.board.allShipsSunk()
    );
  }

  return { startGame };
}

export default createGameController;
