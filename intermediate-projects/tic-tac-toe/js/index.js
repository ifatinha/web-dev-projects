const themeToggleBtn = document.querySelector("#theme-toggle");
const game = document.querySelector("#game");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#reset");
const body = document.body;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "✖️";
let gameActive = true;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const allowedKeys = ["O", "o", "x", "X"];

const highlightWinner = function (combo) {
  combo.forEach((index) => cells[index].classList.add("win"));
};

const switchPlayer = function () {
  currentPlayer = currentPlayer === "✖️" ? "⭕" : "✖️";
  updateStatus();
};

const resetGame = function () {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "✖️";
  gameActive = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("marked-x", "marked-o", "win");
  });
  game.classList.remove("win");
  updateStatus();
};

const updateStatus = function () {
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
};

const checkResult = function () {
  for (combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      highlightWinner(combo);
      statusText.textContent = `🎉 Jogador ${currentPlayer} venceu!`;
      game.classList.add("win");
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    statusText.textContent = "😐 Empate!";
    return;
  }

  switchPlayer();
};

const handleCellClick = function (event) {
  const index = event.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(`marked-${currentPlayer.toLowerCase()}`);
  checkResult();
};

const startGame = function () {
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", resetGame);
  updateStatus();
};

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "☀️ Modo Claro";
    localStorage.setItem("theme", "dark-mode");
  } else {
    themeToggleBtn.textContent = "🌙 Modo Escuro";
    localStorage.setItem("theme", "light");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const saveTheme = localStorage.getItem("theme");

  if (saveTheme === "dark-mode") {
    body.classList.add("dark-mode");
  }
});

startGame();
