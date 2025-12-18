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
    dir = direction.toLowerCase();

    if (this.isDirectionInvalid(dir)) return;
    if (this.invalidCoords(length, x, y, dir)) return;

    const ship = new Ship(length);

    for (let i = 0; i < length; i++) {
      if (dir === "vertical") {
        this.#grid[y + i][x] = ship;
      } else {
        this.#grid[y][x + i] = ship;
      }
    }
    this.#ships.push(ship);
  }

  invalidCoords(length, x, y, direction) {
    if (x < 0 || y < 0 || x > 9 || y > 9) return true;

    if (direction === "horizontal") {
      return x + length > 9;
    } else if (direction === "vertical") {
      return y + length > 9;
    }
  }

  isDirectionInvalid(direction) {
    return direction !== "horizontal" && direction !== "vertical";
  }
}

export default Gameboard;
