document.addEventListener("DOMContentLoaded", () => {
  const passwordDisplay = document.querySelector("#password");
  const lengthInput = document.querySelector("#length");
  const lengthValue = document.querySelector("#lengthValue");
  const uppercaseCheckboxInput = document.querySelector("#uppercase");
  const lowerCaseCheckboxInput = document.querySelector("#lowercase");
  const numbersCheckboxInput = document.querySelector("#numbers");
  const symbolsCheckboxInput = document.querySelector("#symbols");
  const generateBtn = document.querySelector("#generate");
  const copyBtn = document.querySelector("#copy");

  //Functions para gerar caracteres
  function getRandomLower() {
    //[a-z]
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    //[A-Z]
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    //[0-9]
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%^&*()_+{}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function generatePassword() {
    const length = +lengthInput.value;
    const hasUpper = uppercaseCheckboxInput.checked;
    const hasLower = lowerCaseCheckboxInput.checked;
    const hasNumber = numbersCheckboxInput.checked;
    const hasSymbol = symbolsCheckboxInput.checked;

    const typesArr = [
      { enabled: hasUpper, func: getRandomUpper },
      { enabled: hasLower, func: getRandomLower },
      { enabled: hasNumber, func: getRandomNumber },
      { enabled: hasSymbol, func: getRandomSymbol },
    ].filter((item) => item.enabled);

    if (typesArr.length === 0) {
      return "Selecione pelo menos um opção!";
    }

    let password = "";

    for (let i = 0; i < length; i++) {
      const randFunc =
        typesArr[Math.floor(Math.random() * typesArr.length)].func;

      password += randFunc();
    }

    return password;
  }

  lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
  });

  generateBtn.addEventListener("click", () => {
    const password = generatePassword();
    passwordDisplay.value = password;
  });

  copyBtn.addEventListener("click", () => {
    const password = passwordDisplay.value;

    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
      copyBtn.textContent = "✅ Copiado!";
      setTimeout(() => {
        copyBtn.textContent = "📋 Copiar";
      }, 2000);
    });
  });
});
