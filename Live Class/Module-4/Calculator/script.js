let expression = '';

function pressKey(key) {
  expression += key;
  document.getElementById('output').textContent = expression;
}

function calculate() {
  try {
    expression = eval(expression).toString();
    document.getElementById('output').textContent = expression;
  } catch {
    document.getElementById('output').textContent = "Error";
    expression = '';
  }
}

function clearDisplay() {
  expression = '';
  document.getElementById('output').textContent = '0';
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}
