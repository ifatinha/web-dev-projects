const decrementBtn = document.querySelector("#decrement");
const incrementBtn = document.querySelector("#increment");
const counterEl = document.querySelector("#counter");
let counter = 0;

decrementBtn.addEventListener("click", () => {
  if (counter > 0) {
    counter--;
    updateCounter();
  }
});

incrementBtn.addEventListener("click", () => {
  counter++;
  updateCounter();
});

function updateCounter() {
  counterEl.textContent = counter;
}
