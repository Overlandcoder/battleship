function createDisplayController() {
  const container = document.querySelector(".container");

  function displayBoard(board) {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    for (let row = 0; row <= 9; row++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      for (let col = 0; col <= 9; col++) {
        const btn = createButton(board.squareAt(col, row));
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
