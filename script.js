let $buttons = document.querySelectorAll("button");
let input = document.querySelector(".input");
let total = document.querySelector(".total");

let valOne = [];
let valTwo = [];
let operator = [];
let finalAnswer = 0;

[...$buttons].forEach((button) => {
  button.addEventListener("click", function () {
    const buttonText = this.innerHTML;

    switch (buttonText) {
      case "C":
        clearDisplay();
        break;
      case "=":
        makeCalculation();
        break;
      case "+":
      case "*":
      case "/":
      case "-":
        operator.splice(0, 1, buttonText);
        storeValue();
        break;
      case "sin":
      case "cos":
      case "tan":
        operator.splice(0, 1, buttonText);
        storeValue();
        break;
      default:
        if (valOne.length > 8) {
          ErrorInput();
        } else {
          valOne.push(buttonText);
          input.textContent = valOne.join("");
        }
        break;
    }
  });
});

function ErrorInput() {
  input.textContent = "";
  total.textContent = "Error, coba lagi";
  setTimeout(clearDisplay, 2000);
}

function clearDisplay() {
  input.textContent = "";
  total.textContent = "";
  valOne = [];
  valTwo = [];
  operator = [];
}

function makeCalculation() {
  if (operator[0] === "sin" || operator[0] === "cos" || operator[0] === "tan") {
    const operation = operator[0];
    const value = parseFloat(valOne.join(""));
    let result;

    switch (operation) {
      case "sin":
        result = Math.sin(value);
        break;
      case "cos":
        result = Math.cos(value);
        break;
      case "tan":
        result = Math.tan(value);
        break;
    }

    input.textContent = result.toFixed(4);
  } else {
    if (valTwo.length > 0 && operator.length !== 0) {
      finalAnswer = eval(valTwo.join("") + operator + valOne.join(""));
      total.textContent = eval(finalAnswer).toFixed(2);
      input.textContent = "";
      valTwo = [finalAnswer];
      valOne = [];
    } else if (operator.length === 0) {
      total.textContent = "Error, coba lagi.";
    } else if (isNaN(finalAnswer)) {
      total.textContent = "NaN, coba lagi.";
    } else {
      finalAnswer = eval(valTwo.join("") + operator + valOne.join(""));
      total.textContent = eval(finalAnswer).toFixed(2);
      input.textContent = "";
      valTwo = [finalAnswer];
      valOne = [];
    }
  }
}

function storeValue() {
  if (valOne.length > 0 || valTwo.length > 0) {
    if (valTwo.length > 0) {
      total.textContent = valTwo.join("") + " " + operator;
    } else {
      valTwo.push(valOne.join(""));
      valOne = [];
      input.textContent = "";
    }
    total.textContent = valTwo.join("") + " " + operator;
  }
}
