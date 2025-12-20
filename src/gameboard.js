import Ship from "./ship.js";

class Gameboard {
  #grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  #ships = [];
  #missedAttacks = [];
  #successfulHits = [];

  squareAt(x, y) {
    return this.#grid[y][x];
  }

  get ships() {
    return [...this.#ships];
  }

  get activeShipCount() {
    return this.#ships.length;
  }

  get missedAttacks() {
    return this.#missedAttacks;
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
    return this.squareAt(x, y) !== null;
  }

  receiveAttack(x, y) {
    if (this.wasAlreadyAttacked(x, y)) return;
    const target = this.squareAt(x, y);

    if (target) {
      target.hit();
      this.#successfulHits.push({ x, y });
    } else {
      this.#missedAttacks.push({ x, y });
    }
  }

  wasAlreadyAttacked(x, y) {
    return this.wasAlreadyMissed(x, y) || this.wasAlreadyHit(x, y);
  }

  wasAlreadyMissed(x, y) {
    return this.#missedAttacks.some((miss) => x === miss.x && y === miss.y);
  }

  wasAlreadyHit(x, y) {
    return this.#successfulHits.some((hit) => x === hit.x && y === hit.y);
  }
}

export default Gameboard;
