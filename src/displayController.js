function createDisplayController() {
  const container = document.querySelector(".container");

  function displayBoard(board, hideShips = false) {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add(hideShips ? "computer-board" : "player-board");

    for (let y = 0; y <= 9; y++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      for (let x = 0; x <= 9; x++) {
        const btn = createButton(board.squareAt(x, y), x, y, hideShips);
        rowDiv.appendChild(btn);
      }
      boardDiv.appendChild(rowDiv);
    }
    container.appendChild(boardDiv);
  }

  function createButton(square, x, y, hideShips) {
    const btn = document.createElement("button");
    btn.dataset.x = x;
    btn.dataset.y = y;
    btn.classList.add(square && !hideShips ? "ship" : "water");
    return btn;
  }

  function addAttackListener(handleAttack) {
    const computerBoardDiv = document.querySelector(".computer-board");
    if (!computerBoardDiv) return;

    computerBoardDiv.addEventListener("click", (event) => {
      const square = event.target;
      if (event.target.classList.contains("water")) {
        const { x, y } = square.dataset;
        handleAttack(x, y);
      }
    });
  }

  return { displayBoard, addAttackListener };
}

export default createDisplayController;
