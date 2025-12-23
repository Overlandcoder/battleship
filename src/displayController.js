function createDisplayController() {
  const boardsDiv = document.querySelector(".boards");

  function displayBoard(board, hideShips = false) {
    const boardDiv = document.querySelector(
      hideShips ? ".computer-board" : ".player-board"
    );
    boardDiv.textContent = "";

    for (let y = 0; y <= 9; y++) {
      const rowDiv = createRow();
      for (let x = 0; x <= 9; x++) {
        const square = board.squareAt(x, y);
        const hit = board.isHit(x, y);
        const miss = board.isMiss(x, y);
        const btn = createButton(square, x, y, hideShips, hit, miss);
        rowDiv.appendChild(btn);
      }
      boardDiv.appendChild(rowDiv);
    }
    boardsDiv.appendChild(boardDiv);
  }

  function createRow() {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    return rowDiv;
  }

  function createButton(square, x, y, hideShips, isHit, isMiss) {
    const btn = document.createElement("button");
    btn.dataset.x = x;
    btn.dataset.y = y;
    if (isHit) {
      btn.textContent = "X";
      btn.classList.add("hit");
    } else if (isMiss) {
      btn.classList.add("miss");
    } else {
      btn.classList.add(square && !hideShips ? "ship" : "water");
    }
    btn.classList.add("square");
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

  function displayMessage(isHit, isSunk) {
    const messageLogDiv = document.querySelector(".message-log");
    const message = isSunk
      ? "You sank a ship!"
      : isHit
      ? "You hit a ship!"
      : "You missed";
    messageLogDiv.textContent = message;
    messageLogDiv.classList.remove("highlight");
    if (isHit || isSunk) messageLogDiv.classList.add("highlight");
    messageLogDiv.classList.remove("animate-log");
    void messageLogDiv.offsetWidth;
    messageLogDiv.classList.add("animate-log");
  }

  return { displayBoard, addAttackListener, displayMessage };
}

export default createDisplayController;
