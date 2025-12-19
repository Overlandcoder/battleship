import Ship from "./ship.js";

class Gameboard {
  #grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  #ships = [];

  // refactor later (don't expose whole grid, replace with getSquare method)
  get grid() {
    return this.#grid;
  }

  get ships() {
    return this.#ships;
  }

  placeShip(length, x, y, direction = "horizontal") {
    const dir = direction.toLowerCase();

    if (!this.isValidDirection(dir)) return;
    if (!this.isWithinBounds(length, x, y, dir)) return;
    const coords = [];

    for (let i = 0; i < length; i++) {
      dir === "vertical"
        ? coords.push({ x: x, y: y + i })
        : coords.push({ x: x + i, y: y });
    }

    if (coords.some(({ x, y }) => this.isSquareOccupied(x, y))) return;
    const ship = new Ship(length);
    coords.forEach(({ x, y }) => (this.#grid[y][x] = ship));
    this.#ships.push(ship);
  }

  isWithinBounds(length, x, y, direction) {
    const GRID_SIZE = 10;

    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) return false;

    if (direction === "horizontal") {
      return x + length <= GRID_SIZE;
    } else if (direction === "vertical") {
      return y + length <= GRID_SIZE;
    }
  }

  isValidDirection(direction) {
    return direction === "horizontal" || direction === "vertical";
  }

  isSquareOccupied(x, y) {
    return this.grid[y][x] !== null;
  }

  receiveAttack(x, y) {
    const ship = this.grid[y][x];
    if (ship) ship.hit();
  }
}

export default Gameboard;
