import Gameboard from "../src/gameboard.js";

describe("ship placement", () => {
  test("ship can be placed horizontally", () => {
    const board = new Gameboard();
    board.placeShip(5, 2, 0, "horizontal");
    const carrier = board.ships[0];
    const [x, y] = [2, 0];

    for (let i = 0; i < carrier.length; i++) {
      expect(board.grid[y][x + i]).toBe(carrier);
    }
  });

  test("ship can be placed vertically", () => {
    const board = new Gameboard();
    board.placeShip(5, 0, 0, "Vertical");
    const carrier = board.ships[0];
    const [x, y] = [0, 0];
    // expect(board.grid[0][0]).toBe(carrier);
    // expect(board.grid[1][0]).toBe(carrier);
    // expect(board.grid[2][0]).toBe(carrier);
    // expect(board.grid[3][0]).toBe(carrier);
    // expect(board.grid[4][0]).toBe(carrier);
    for (let i = 0; i < carrier.length; i++) {
      expect(board.grid[y + i][x]).toBe(carrier);
    }
  });
});
