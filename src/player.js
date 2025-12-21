class Player {
  #board;

  constructor(name, board) {
    this.name = name;
    this.#board = board
  }

  get board() {
    return this.#board;
  }
}

export default Player