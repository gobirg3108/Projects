const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.toString().slice(0, -1);
}

function calculate() {
  try {
    // Replace × and ÷ with * and / for eval
    let expression = display.value.replace(/×/g, "*").replace(/÷/g, "/");
    display.value = eval(expression);
  } catch (error) {
    display.value = "Error";
  }
}
