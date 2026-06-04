function createDisplayController() {
  let chosenShipLength = null;
  let direction = "horizontal";

  function displayBoard(board, hideShips = false) {
    const boardsContainer = document.querySelector(".boards");
    boardsContainer.style.display = "flex";
    const boardContainer = document.querySelector(
      hideShips ? ".computer-board-container" : ".player-board-container"
    );
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
    boardContainer.appendChild(boardDiv);
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

  function addPlacementChoiceListener(onPlacementSelection) {
    const container = document.querySelector(".ship-placement");

    container.addEventListener("click", (event) => {
      const placementChoice = event.target.textContent;
      if (placementChoice !== "Random" && placementChoice !== "Manual") return;

      container.style.display = "none";
      onPlacementSelection(placementChoice);
    });
  }

  function toggleShipChoices() {
    const container = document.querySelector(".manual-placement");
    toggleDisplay(container);
  }

  function toggleComputerBoard() {
    const boardContainer = document.querySelector(".computer-board-container");
    toggleDisplay(boardContainer);
  }

  function toggleDisplay(element) {
    const currentDisplay = window.getComputedStyle(element).display;
    element.style.display = currentDisplay === "none" ? "flex" : "none";
  }

  function addShipChoicesListener() {
    const shipChoices = document.querySelector(".ship-choices");

    shipChoices.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON") return;
      chosenShipLength = parseInt(event.target.dataset.length);
      highlightShipChoice(event.target);
    });
  }

  function highlightShipChoice(shipChoice) {
    removeShipChoiceHighlight();
    shipChoice.classList.add("active-choice");
  }

  function removeShipChoiceHighlight() {
    const previousChoice = document.querySelector(".active-choice");
    previousChoice?.classList.remove("active-choice");
  }

  function addHoverListener(canBePlaced) {
    const boardDiv = document.querySelector(".player-board");
    boardDiv.addEventListener("mouseover", (event) => {
      removeOldHighlights();
      const x = parseInt(event.target.dataset.x);
      const y = parseInt(event.target.dataset.y);
      const coords = createShipCoordinates(chosenShipLength, x, y);

      if (!canBePlaced(chosenShipLength, x, y, direction)) {
        event.target.style.cursor = "not-allowed";

        return;
      }

      event.target.style.cursor = "pointer";
      coords.forEach((coord) => toggleSquareHighlight(coord, true));
    });
  }

  function removeOldHighlights() {
    const highlightedSquares = document.querySelectorAll(
      ".player-board .temp-ship"
    );
    highlightedSquares.forEach((square) => {
      const x = square.dataset.x;
      const y = square.dataset.y;
      toggleSquareHighlight({ x, y }, false);
    });
  }

  function createShipCoordinates(length, x, y) {
    const coords = [];

    for (let i = 0; i < length; i++) {
      direction === "vertical"
        ? coords.push({ x: x, y: y + i })
        : coords.push({ x: x + i, y: y });
    }

    return coords;
  }

  function toggleSquareHighlight({ x, y }, highlight) {
    const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    if (!square) return;

    square.classList.toggle("temp-ship", highlight);
    square.classList.toggle("water", !highlight);
  }

  function addShipPlacedListener(onShipPlaced, playerBoard, shipCount) {
    const boardDiv = document.querySelector(".player-board");

    boardDiv.addEventListener("click", (event) => {
      if (!chosenShipLength) return;

      const x = parseInt(event.target.dataset.x);
      const y = parseInt(event.target.dataset.y);
      let shipPlaced = onShipPlaced(chosenShipLength, x, y, direction);

      if (shipPlaced) {
        const shipPlacedButton = document.querySelector(".active-choice");
        disableButton(shipPlacedButton);
        removeShipChoiceHighlight();
        chosenShipLength = null;
        shipPlaced = false;
      }

      displayBoard(playerBoard);

      if (shipCount() === 5) {
        toggleShipChoices();
        toggleComputerBoard();
      }
    });
  }

  function disableButton(button) {
    button.disabled = true;
    button.classList.remove("ship-choice");
    button.style.cursor = "not-allowed";
    button.style.textDecoration = "line-through";
    button.style.textDecorationColor = "red";
    button.style.textDecorationThickness = "3px";
  }

  function addRotationListener() {
    window.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "r") {
        direction = direction === "horizontal" ? "vertical" : "horizontal";
        const hoveredSquare = document.querySelector(".square:hover");

        if (hoveredSquare) {
          hoveredSquare.dispatchEvent(
            new MouseEvent("mouseover", { bubbles: true })
          );
        }
      }
    });
  }

  function addAttackListener(handleAttack) {
    const container = document.querySelector(".computer-board-container");
    if (!container) return;

    container.addEventListener("click", (event) => {
      const square = event.target;
      if (event.target.classList.contains("water")) {
        const x = Number(square.dataset.x);
        const y = Number(square.dataset.y);
        handleAttack(x, y);
      }
    });
  }

  function displayMessage(isHit, isSunk, playerName) {
    const messageLogDiv = document.querySelector(".message-log");
    const message = isSunk
      ? `${playerName} sank a ship!`
      : isHit
      ? `${playerName} hit a ship!`
      : `${playerName} missed`;
    messageLogDiv.textContent = message;
    messageLogDiv.classList.remove("highlight");
    if (isHit || isSunk) messageLogDiv.classList.add("highlight");
    messageLogDiv.classList.remove("animate-log");
    void messageLogDiv.offsetWidth;
    messageLogDiv.classList.add("animate-log");
  }

  function displayWinner(winnerName) {
    const messageLogDiv = document.querySelector(".message-log");
    messageLogDiv.textContent = `${winnerName.toUpperCase()} WON!`;
  }

  return {
    toggleComputerBoard,
    addPlacementChoiceListener,
    addShipChoicesListener,
    addHoverListener,
    addRotationListener,
    addShipPlacedListener,
    toggleShipChoices,
    displayBoard,
    addAttackListener,
    displayMessage,
    displayWinner,
  };
}

export default createDisplayController;
