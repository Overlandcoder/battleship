function createDisplayController() {
  const container = document.querySelector(".container");

  function displayBoard(board) {
    for (let row = 0; row <= 9; row++) {
      const rowDiv = document.createElement("div");
      for (let col = 0; col <= 9; col++) {
        const btn = document.createElement("button");
        const ship = board.squareAt(col, row);
        btn.textContent = ship ? "[]" : "-";
        rowDiv.appendChild(btn);
      }
      container.appendChild(rowDiv);
    }
  }

  return { displayBoard };
}

export default createDisplayController;
