const themeToggleBtn = document.querySelector("#theme-toggle");
const body = document.body;

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "☀️ Modo Claro";
    localStorage.setItem("theme", "dark-mode");
  } else {
    themeToggleBtn.textContent = "🌙 Modo Escuro";
    localStorage.setItem("theme", "light");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const saveTheme = localStorage.getItem("theme");

  if (saveTheme === "dark-mode") {
    body.classList.add("dark-mode");
  }
});
