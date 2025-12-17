class Ship {
  #length;
  #hits = 0;
  #isSunk = false;

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
    return this.#isSunk;
  }
}

export default Ship;
