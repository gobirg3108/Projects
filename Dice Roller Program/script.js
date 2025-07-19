function rollDice() {
  const numOfDice = document.getElementById("numOfDice").value;
  const diceResult = document.getElementById("diceResult");
  const diceImages = document.getElementById("diceImages");
  const totalResult = document.getElementById("totalResult");
  const values = [];
  const images = [];

  // Clear previous results
  diceResult.innerHTML = "";
  diceImages.innerHTML = "";
  totalResult.innerHTML = "";

  // Validate input
  if (numOfDice < 1 || numOfDice > 10) {
    diceResult.textContent = "Please enter a number between 1 and 10";
    return;
  }

  // Roll the dice
  for (let i = 0; i < numOfDice; i++) {
    const value = Math.floor(Math.random() * 6) + 1;
    values.push(value);
    images.push(
      `<img src="dice_images/${value}.png" alt="Dice showing ${value}">`
    );
  }

  // Calculate total
  const total = values.reduce((sum, value) => sum + value, 0);

  // Display results
  diceResult.textContent = `Individual rolls: ${values.join(", ")}`;
  totalResult.textContent = `Total: ${total}`;
  diceImages.innerHTML = images.join("");

  // Add animation class to dice images
  const diceElements = diceImages.querySelectorAll("img");
  diceElements.forEach((die, index) => {
    die.style.animation = `rollIn 0.5s ease-out ${index * 0.1}s forwards`;
    die.style.opacity = "0";
    die.style.transform = "translateY(-20px) rotate(180deg)";
  });
}

// Add keypress event for Enter key
document
  .getElementById("numOfDice")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      rollDice();
    }
  });

// Add CSS for animation
const style = document.createElement("style");
style.textContent = `
  @keyframes rollIn {
    to {
      opacity: 1;
      transform: translateY(0) rotate(0);
    }
  }
`;
document.head.appendChild(style);
