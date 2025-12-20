import Gameboard from "../src/gameboard.js";

describe("ship placement", () => {
  describe("ship can be placed correctly", () => {
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
      board.placeShip(5, 0, 0, "vertical");
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

  describe("ship cannot be placed out of bounds horizontally", () => {
    test("ship cannot be placed off the right edge", () => {
      const board = new Gameboard();
      board.placeShip(5, 6, 0, "horizontal");
      expect(board.ships.length).toBe(0);
    });

    test("ship cannot be placed off the left edge", () => {
      const board = new Gameboard();
      board.placeShip(5, -1, 0, "horizontal");
      expect(board.ships.length).toBe(0);
    });
  });

  describe("ship cannot be placed out of bounds vertically", () => {
    test("ship cannot be placed off the bottom edge", () => {
      const board = new Gameboard();
      board.placeShip(5, 0, 7, "vertical");
      expect(board.ships.length).toBe(0);
    });

    test("ship cannot be placed off the top edge", () => {
      const board = new Gameboard();
      board.placeShip(5, 0, -1, "vertical");
      expect(board.ships.length).toBe(0);
    });
  });

  describe("ship cannot be placed on top of another ship", () => {
    test("prevent full horizontal overlap", () => {
      const board = new Gameboard();
      board.placeShip(5, 0, 0, "horizontal");
      expect(board.ships.length).toBe(1);
      board.placeShip(5, 0, 0, "horizontal");
      expect(board.ships.length).toBe(1);
    });

    test("prevent partial horizontal overlap", () => {
      const board = new Gameboard();
      board.placeShip(5, 0, 0, "horizontal");
      expect(board.ships.length).toBe(1);
      board.placeShip(5, 4, 0, "horizontal");
      expect(board.ships.length).toBe(1);
    });

    test("prevent full vertical overlap", () => {
      const board = new Gameboard();
      board.placeShip(5, 7, 0, "vertical");
      expect(board.ships.length).toBe(1);
      board.placeShip(5, 7, 0, "vertical");
      expect(board.ships.length).toBe(1);
    });

    test("prevent partial vertical overlap", () => {
      const board = new Gameboard();
      board.placeShip(5, 7, 0, "vertical");
      expect(board.ships.length).toBe(1);
      board.placeShip(5, 7, 4, "vertical");
      expect(board.ships.length).toBe(1);
    });
  });
});

describe("ship attacks", () => {
  describe("successful attacks", () => {
    test("ship can receive an attack", () => {
      const board = new Gameboard();
      board.placeShip(2, 0, 0, "horizontal");
      const ship = board.ships[0];
      expect(ship.hits).toBe(0);
      board.receiveAttack(0, 0);
      expect(ship.hits).toBe(1);
    });
  });

  describe("missed attacks", () => {
    test("a missed attack gets recorded and does not hit a ship", () => {
      const board = new Gameboard();
      board.placeShip(2, 0, 0, "horizontal");
      const ship = board.ships[0];
      expect(ship.hits).toBe(0);
      board.receiveAttack(0, 1);
      expect(ship.hits).toBe(0);
      expect(board.missedAttacks).toContainEqual({ x: 0, y: 1 });
    });
  });
});
