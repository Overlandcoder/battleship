class Ship {
  #length;
  #hits = 0;

  constructor(length) {
    this.#length = length;
  }

  get length() {
    return this.#length;
  }

  get hits() {
    return this.#hits;
  }

  get isSunk() {
    return this.#hits === this.#length;
  }

  hit() {
    this.#hits++;
  }
}

export default Ship;
