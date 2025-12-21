function createDisplayController() {
  const container = document.querySelector(".container");

  function displayBoard(board) {
    for (let row = 0; row <= 9; row++) {
      const rowDiv = document.createElement("div");
      for (let col = 0; col <= 9; col++) {
        const btn = createButton(board.squareAt(col, row));
        rowDiv.appendChild(btn);
      }
      container.appendChild(rowDiv);
    }
  }

  function createButton(square) {
    const btn = document.createElement("button");
    btn.textContent = square ? "[]" : "-";
    return btn;
  }

  return { displayBoard };
}

export default createDisplayController;
