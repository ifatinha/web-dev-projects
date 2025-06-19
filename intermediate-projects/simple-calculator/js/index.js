document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#display");
  const numbersButtons = document.querySelectorAll("[data-number]");
  const operatorsButtons = document.querySelectorAll("[data-operator]");
  const clearButton = document.querySelector("#clear");
  const deleteButton = document.querySelector("#delete");
  const powerButton = document.querySelector("#sqrt");
  const equalsButton = document.querySelector("#equals");
  const copyButton = document.querySelector("#copy-result");
  let currentInput = "";

  function updateDisplay() {
    display.value = currentInput;
  }

  numbersButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentInput += button.dataset.number;
      updateDisplay();
    });
  });

  operatorsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const operator = button.dataset.operator;
      if (operator === "" || /[+\-*/^]$/.test(currentInput)) return;
      currentInput += operator;
      updateDisplay();
    });
  });

  clearButton.addEventListener("click", () => {
    currentInput = "";
    updateDisplay();
  });

  deleteButton.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  });

  equalsButton.addEventListener("click", () => {
    try {
      if (currentInput.includes("^")) {
        const arr = currentInput.split("");
        currentInput = Math.pow(+arr[0], +arr[2]);
      } else {
        currentInput = eval(currentInput).toString();
      }
    } catch (error) {
      currentInput = "Erro";
    }
    updateDisplay();
  });

  copyButton.addEventListener("click", () => {
    if (display.value) {
      navigator.clipboard.writeText(display.value).then(() => {
        copyButton.textContent = "✅ Copiado!";
        setTimeout(() => {
          copyButton.textContent = "📋 Copiar Resultado";
        }, 2000);
      });
    }
  });
});
