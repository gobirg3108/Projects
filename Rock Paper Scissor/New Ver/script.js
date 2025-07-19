document.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice");
  const playerScoreEl = document.getElementById("player-score");
  const computerScoreEl = document.getElementById("computer-score");
  const resultEl = document.querySelector(".result p");
  const actionMessageEl = document.querySelector(".action-message");
  const computerHandEl = document.querySelector(".computer-hand i");
  const resetBtn = document.getElementById("reset");
  const confettiContainer = document.querySelector(".confetti-container");

  let playerScore = 0;
  let computerScore = 0;
  let gameActive = true;

  // Game functions
  function playGame(e) {
    if (!gameActive) return;

    const playerChoice = e.currentTarget.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    showChoices(playerChoice, computerChoice);
    updateScore(winner);
    displayResult(winner, playerChoice, computerChoice);
  }

  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  }

  function getWinner(p, c) {
    if (p === c) return "draw";
    if (
      (p === "rock" && c === "scissors") ||
      (p === "paper" && c === "rock") ||
      (p === "scissors" && c === "paper")
    ) {
      return "player";
    } else {
      return "computer";
    }
  }

  function showChoices(playerChoice, computerChoice) {
    // Highlight player's choice
    choices.forEach((choice) => {
      choice.style.transform = "translateY(0) scale(1)";
      choice.style.background = "rgba(255, 255, 255, 0.1)";
    });

    const playerSelected = document.getElementById(playerChoice);
    playerSelected.style.transform = "translateY(-10px) scale(1.1)";
    playerSelected.style.background = "rgba(255, 255, 255, 0.2)";

    // Show computer's choice with animation
    computerHandEl.classList.remove("fa-question");
    computerHandEl.classList.add(getIconClass(computerChoice));
    computerHandEl.parentElement.style.color = getChoiceColor(computerChoice);

    // Animation
    computerHandEl.parentElement.style.animation = "none";
    void computerHandEl.parentElement.offsetWidth; // Trigger reflow
    computerHandEl.parentElement.style.animation = "winPulse 0.5s ease";
  }

  function getIconClass(choice) {
    switch (choice) {
      case "rock":
        return "fa-hand-rock";
      case "paper":
        return "fa-hand-paper";
      case "scissors":
        return "fa-hand-scissors";
      default:
        return "fa-question";
    }
  }

  function getChoiceColor(choice) {
    switch (choice) {
      case "rock":
        return "#ff6b6b";
      case "paper":
        return "#45aaf2";
      case "scissors":
        return "#2ecc71";
      default:
        return "#f39c12";
    }
  }

  function updateScore(winner) {
    if (winner === "player") {
      playerScore++;
      playerScoreEl.textContent = playerScore;
      createConfetti();
    } else if (winner === "computer") {
      computerScore++;
      computerScoreEl.textContent = computerScore;
    }

    // Check for game over (first to 5 wins)
    if (playerScore === 5 || computerScore === 5) {
      gameActive = false;
      const winner = playerScore === 5 ? "You" : "Computer";
      resultEl.textContent = `${winner} won the game! 🎉`;
      actionMessageEl.textContent = "Game over! Click reset to play again.";

      if (playerScore === 5) {
        createConfetti(true);
      }
    }
  }

  function displayResult(winner, playerChoice, computerChoice) {
    if (winner === "player") {
      resultEl.textContent = `You win! ${capitalizeFirstLetter(
        playerChoice
      )} beats ${capitalizeFirstLetter(computerChoice)}`;
      resultEl.style.color = "#2ecc71";
    } else if (winner === "computer") {
      resultEl.textContent = `You lose! ${capitalizeFirstLetter(
        computerChoice
      )} beats ${capitalizeFirstLetter(playerChoice)}`;
      resultEl.style.color = "#e74c3c";
    } else {
      resultEl.textContent = "It's a draw!";
      resultEl.style.color = "#f39c12";
    }

    actionMessageEl.textContent = "Click any option to play again";
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createConfetti(intense = false) {
    const colors = [
      "#ff6b6b",
      "#45aaf2",
      "#2ecc71",
      "#f39c12",
      "#9b59b6",
      "#1abc9c",
    ];
    const count = intense ? 150 : 50;

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = "-10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confettiContainer.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  }

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = "0";
    computerScoreEl.textContent = "0";
    resultEl.textContent = "Make your move!";
    resultEl.style.color = "white";
    actionMessageEl.textContent = "Click any option to start";
    gameActive = true;

    // Reset choices display
    choices.forEach((choice) => {
      choice.style.transform = "translateY(0) scale(1)";
      choice.style.background = "rgba(255, 255, 255, 0.1)";
    });

    computerHandEl.className = "fas fa-question";
    computerHandEl.parentElement.style.color = "#f39c12";
  }

  // Event listeners
  choices.forEach((choice) => choice.addEventListener("click", playGame));
  resetBtn.addEventListener("click", resetGame);

  // Initialize computer hand
  computerHandEl.className = "fas fa-question";
});
