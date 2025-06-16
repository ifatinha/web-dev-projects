document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");
  const fullnameInput = document.querySelector("#fullname");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirmPassword");

  function setError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add("error");
    formControl.classList.remove("success");
    const small = document.querySelector(".small");
    small.textContent = message;
  }

  function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.add("success");
    formControl.classList.remove("error");
    const small = document.querySelector(".small");
    small.textContent = "";
  }

  function isValidEmail(input) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  }

  function clearStates() {
    const inputs = document.querySelectorAll(".form-control input");
    inputs.forEach((input) => {
      input.value = "";
      input.parentElement.classList.remove("error");
      input.parentElement.classList.remove("success");
    });
  }

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    let isValid = true;

    if (fullnameInput.value.trim() === "") {
      setError(fullnameInput, "O nome é obrigatório.");
      isValid = false;
    } else {
      setSuccess(fullnameInput);
    }

    if (!isValidEmail(emailInput.value)) {
      setError(emailInput, "Digite um email valido.");
      isValid = false;
    } else {
      setSuccess(emailInput);
    }

    if (passwordInput.value.length < 8) {
      setError(passwordInput, "A senha deve ter no mínimo 6 caracteres.");
      isValid = false;
    } else {
      setSuccess(passwordInput);
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      setError(confirmPasswordInput, "As senhas devem ser iguais");
      isValid = false;
    } else {
      setSuccess(confirmPasswordInput);
    }

    if (isValid) {
      alert("O formulário foi enviado com sucesso!");
      form.reset();
      clearStates();
    }
  });
});
