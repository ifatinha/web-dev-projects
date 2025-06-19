const body = document.body;
const toggleBtn = document.querySelector("#toggle-theme");

function toggleTheme() {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

toggleBtn.addEventListener("click", toggleTheme);

window.addEventListener("DOMContentLoaded", () => {
  const saveTheme = localStorage.getItem("theme");

  if (saveTheme === "dark") {
    body.classList.add("dark");
  }
});
