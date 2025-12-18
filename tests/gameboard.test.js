import Gameboard from "../src/gameboard.js";

describe("ship placement", () => {
  test("ship can be placed horizontally", () => {
    const board = new Gameboard();
    board.placeShip(5, 2, 0);
    const carrier = board.ships[0];
    const [x, y] = [2, 0];

    for (let i = 0; i < carrier.length; i++) {
      expect(board.grid[y][x + i]).toBe(carrier);
    }
  });
});
