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

  placeShip(length, x, y) {
    const ship = new Ship(length);
    this.#ships.push(ship);

    for (let i = 0; i < length; i++) {
      this.#grid[y][x + i] = ship;
    }
  }
}

export default Gameboard;
