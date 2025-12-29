class Player {
  #board;

  constructor(name, board) {
    this.name = name;
    this.#board = board;
  }

  get board() {
    return this.#board;
  }
}

class ComputerPlayer extends Player {
  constructor(board) {
    super("Computer", board);
  }

  generateAttack(opponentBoard) {
    let x, y;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (opponentBoard.wasAlreadyAttacked(x, y));

    return { x, y };
  }
}

export { ComputerPlayer, Player };
