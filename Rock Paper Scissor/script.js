const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const resetBtn = document.getElementById("resetBtn");

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

// Initialize game
function initGame() {
  playerScore = 0;
  computerScore = 0;
  gameOver = false;
  updateScoreDisplay();
  resultDisplay.textContent = "";
  resultDisplay.classList.remove("greenText", "redText", "winner-animation");
  playerDisplay.textContent = "Player: ";
  computerDisplay.textContent = "Computer: ";
}

function playGame(playerChoice) {
  if (gameOver) return;

  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let result = "";

  if (playerChoice === computerChoice) {
    result = "It's a Tie!";
  } else {
    switch (playerChoice) {
      case "rock":
        result = computerChoice === "scissors" ? "You Win! 😊" : "You Lose! 😢";
        break;
      case "paper":
        result = computerChoice === "rock" ? "You Win! 😊" : "You Lose! 😢";
        break;
      case "scissors":
        result = computerChoice === "paper" ? "You Win! 😊" : "You Lose! 😢";
        break;
    }
  }

  playerDisplay.textContent = `Player: ${playerChoice}`;
  computerDisplay.textContent = `Computer: ${computerChoice}`;
  resultDisplay.textContent = result;

  resultDisplay.classList.remove("greenText", "redText");

  switch (result) {
    case "You Win! 😊":
      resultDisplay.classList.add("greenText");
      playerScore++;
      break;
    case "You Lose! 😢":
      resultDisplay.classList.add("redText");
      computerScore++;
      break;
  }

  updateScoreDisplay();
  checkGameOver();
}

function updateScoreDisplay() {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}

function checkGameOver() {
  if (playerScore >= 5 || computerScore >= 5) {
    gameOver = true;
    const winner = playerScore >= 5 ? "Player" : "Computer";
    resultDisplay.textContent = `${winner} Wins the Game! 🎉`;
    resultDisplay.classList.add(
      winner === "Player" ? "greenText" : "redText",
      "winner-animation"
    );
  }
}

// Event Listeners
resetBtn.addEventListener("click", initGame);

// Initialize game on load
document.addEventListener("DOMContentLoaded", initGame);
