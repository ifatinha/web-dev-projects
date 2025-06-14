const clockEl = document.querySelector("#clock");
const dateEl = document.querySelector("#date");

function updateClock() {
  const now = new Date();

  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");

  clockEl.textContent = `${hours}:${minutes}:${seconds}`;

  // Data
  const option = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formatteDate = now.toLocaleDateString("pt-br", option);
  dateEl.textContent = formatteDate;
}

setInterval(updateClock, 1000);
updateClock();
