import "./styles.css";
import createGameController from "./gameController";

document.addEventListener("DOMContentLoaded", () => {
  const game = createGameController();
  game.displayBoards();
});
