class Player {
  #board;

  constructor(name) {
    this.name = name;
  }

  setBoard(board) {
    this.#board = board;
  }

  get board() {
    return this.#board;
  }
}

export default Player