function createDisplayController() {
  const container = document.querySelector(".container");

  function displayBoard(board) {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    for (let y = 0; y <= 9; y++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      for (let x = 0; x <= 9; x++) {
        const btn = createButton(board.squareAt(x, y));
        rowDiv.appendChild(btn);
      }
      boardDiv.appendChild(rowDiv);
    }
    container.appendChild(boardDiv);
  }

  function createButton(square) {
    const btn = document.createElement("button");
    btn.classList.add(square ? "ship" : "water");
    return btn;
  }

  return { displayBoard };
}

export default createDisplayController;
