import Gameboard from "./gameboard.js";
import { ComputerPlayer, Player } from "./player.js";
import createDisplayController from "./displayController.js";

function createGameController() {
  const humanPlayer = new Player("You", new Gameboard());
  const computerPlayer = new ComputerPlayer(new Gameboard());
  const display = createDisplayController();
  let currentPlayer = humanPlayer;

  function startGame() {
    display.addPlacementChoiceListener(handlePlacementChoice);
  }

  function handlePlacementChoice(choice) {
    if (choice === "Random") {
      console.log(choice);
      placeShipsRandomly(humanPlayer);
    }

    placeShipsRandomly(computerPlayer);
    displayBoards();
    display.addAttackListener(handlePlayerTurn);
  }

  function placeShipsRandomly(player) {
    const shipLengths = [2, 3, 3, 4, 5];
    const directions = ["horizontal", "vertical"];

    shipLengths.forEach((length) => {
      let shipPlaced = false;

      while (!shipPlaced) {
        const randomX = Math.floor(Math.random() * 10);
        const randomY = Math.floor(Math.random() * 10);
        const randomDirection = directions[Math.floor(Math.random() * 2)];

        shipPlaced = player.board.placeShip(
          length,
          randomX,
          randomY,
          randomDirection
        );
      }
    });
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
