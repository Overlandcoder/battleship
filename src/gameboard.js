import Ship from "./ship.js";

class Gameboard {
  #grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  #ships = [];

  get grid() {
    return this.#grid;
  }

  get ships() {
    return this.#ships;
  }

  placeShip(length, x, y, direction = "horizontal") {
    if (this.invalidCoords(length, x, y, direction)) return;

    const ship = new Ship(length);
    direction = direction.toLowerCase();

    for (let i = 0; i < length; i++) {
      if (direction === "vertical") {
        this.#grid[y + i][x] = ship;
      } else {
        this.#grid[y][x + i] = ship;
      }
    }
    this.#ships.push(ship);
  }

  invalidCoords(length, x, y, direction) {
    if (direction === "horizontal") {
      return (x < 0 || x + length > 9)
    }
  }
}

export default Gameboard;
