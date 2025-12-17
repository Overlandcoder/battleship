import Ship from "../src/ship.js";

test("creates a ship with the specified length", () => {
  const testShip = new Ship(4);
  expect(testShip.length).toBe(4);
});

test("ship has 0 hits upon creation", () => {
  const testShip = new Ship(4);
  expect(testShip.hits).toBe(0);
});

test("ship is not sunk upon creation", () => {
  const testShip = new Ship(4);
  expect(testShip.isSunk).toBe(false);
});
