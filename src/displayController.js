function createDisplayController() {
  const container = document.querySelector(".container");

  function displayBoard(board, hideShips = false) {
    const boardDiv = document.querySelector(
      hideShips ? ".computer-board" : ".player-board"
    );
    boardDiv.textContent = "";
    // boardDiv.classList.add(hideShips ? "computer-board" : "player-board");

    for (let y = 0; y <= 9; y++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      for (let x = 0; x <= 9; x++) {
        const hit = board.isHit(x, y);
        const btn = createButton(board.squareAt(x, y), x, y, hideShips, hit);
        // if (board.isHit(x, y)) btn.classList.add("hit")
        rowDiv.appendChild(btn);
      }
      boardDiv.appendChild(rowDiv);
    }
    container.appendChild(boardDiv);
  }

  function createButton(square, x, y, hideShips, isHit) {
    const btn = document.createElement("button");
    btn.dataset.x = x;
    btn.dataset.y = y;
    if (isHit) {
      btn.classList.add("hit");
    } else {
      btn.classList.add(square && !hideShips ? "ship" : "water");
    }
    return btn;
  }

  function addAttackListener(handleAttack) {
    const computerBoardDiv = document.querySelector(".computer-board");
    if (!computerBoardDiv) return;

    computerBoardDiv.addEventListener("click", (event) => {
      const square = event.target;
      if (event.target.classList.contains("water")) {
        const x = Number(square.dataset.x);
        const y = Number(square.dataset.y);
        handleAttack(x, y);
      }
    });
  }

  return { displayBoard, addAttackListener };
}

export default createDisplayController;
