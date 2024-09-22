const display = document.getElementById("display");

let firstOperand = "";
let secondOperand = "";
let currOperator = null;
let shouldResetDisplay = false;

function handleNumberClick(number) {
  if (number === "0" && display.value === "0") return;
  if (shouldResetDisplay) {
    display.value = number;
    shouldResetDisplay = false;
  } else {
    display.value += number;
  }
}

function handleOperatorClick(operator) {
  if (operator === "=") {
    evaluate();
    return;
  }
  if (currOperator !== null) {
    evaluate();
  }
  firstOperand = display.value;
  currOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currOperator === null || shouldResetDisplay) return;
  secondOperand = display.value;
  let result = "";
  switch (currOperator) {
    case "+":
      result = parseFloat(firstOperand) + parseFloat(secondOperand);
      break;
    case "-":
      result = parseFloat(firstOperand) - parseFloat(secondOperand);
      break;
    case "*":
      result = parseFloat(firstOperand) * parseFloat(secondOperand);
      break;
    case "/":
      if (secondOperand === "0") {
        display.value = "Error";
        return;
      }
      result = parseFloat(firstOperand) / parseFloat(secondOperand);
      break;
    case "%":
      result = parseFloat(firstOperand) % parseFloat(secondOperand);
      break;
    default:
      return;
  }
  display.value = result.toFixed(2);
  firstOperand = result.toFixed(2);
  secondOperand = "";
  currOperator = null;
}

function clearDisplay() {
  display.value = "0";
  firstOperand = "";
  secondOperand = "";
  currOperator = null;
  shouldResetDisplay = false;
}

document.querySelectorAll(".keys button").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");
    if (!isNaN(key) || key === ".") {
      handleNumberClick(key);
    } else if (key === "C") {
      clearDisplay();
    } else if (key === "+/-" && display.value !== "0") {
      display.value = parseFloat(display.value) * -1;
    } else {
      handleOperatorClick(key);
    }
  });
});
