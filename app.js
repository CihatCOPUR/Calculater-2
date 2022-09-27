const display = document.querySelector(`.calculator-input`);

const keys = document.querySelector(`.calculator-keys`);

let displayValue = `0`;

let firstValue = null;

let operator = null;

let waiting = false;

updateDisplay();

function updateDisplay() {
  display.value = displayValue;
}

keys.onclick = (item) => {
  const element = item.target;

  if (!element.matches(`button`)) return;

  if (element.classList.contains(`operator`)) {
    handleOperator(element.value);
    updateDisplay();
    
    return;
  }

  if (element.classList.contains(`decimal`)) {
    inputDecimal(element.value);
    updateDisplay();
    return;
  }

  if (element.classList.contains(`clear`)) {
    clear();
    updateDisplay();
    return;
  }

  inputNumber(element.value);
  updateDisplay();
};

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);


if(operator&&waiting){
  operator=nextOperator;
  return;
}

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }

  waiting = true;
  operator = nextOperator;
}

function calculate(first, second, operator) {
  if (operator === `+`) {
    return first + second;
  } else if (operator === `-`) {
    return first - second;
  } else if (operator === `*`) {
    return first * second;
  } else if (operator === `/`) {
    return first / second;
  } else {
    return second;
  }
}

function inputNumber(num) {
  if (waiting) {
    displayValue = num;
    waiting = false;
  } else {
    displayValue = displayValue === `0` ? num : displayValue + num;
  }
}

function inputDecimal() {
  if (!displayValue.includes(`.`)) displayValue += `.`;
}

function clear() {
  displayValue = `0`;
}
