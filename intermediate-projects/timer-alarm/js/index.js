document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#display");
  const minutesInput = document.querySelector("#minutes");
  const secondsInput = document.querySelector("#seconds");
  const startBtn = document.querySelector("#start");
  const pauseBtn = document.querySelector("#pause");
  const resetBtn = document.querySelector("#reset");
  const alarmSound = document.querySelector("#alarm-sound");
  let timer;
  let remainingTimer = 0;
  let isRunning = false;

  //Atualiza o display com o tempo restante
  function updateDisplay() {
    const mins = Math.floor(remainingTimer / 60);
    const secs = remainingTimer % 60;
    display.textContent = `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  //Inicia o cronômetro
  function startTime() {
    if (isRunning) return;

    if (!minutesInput || !secondsInput) {
      alert("Por favor, insira minutos e segundos.");
      return;
    }

    const inputMinutes = parseInt(minutesInput.value, 10) || 0;
    const inputSeconds = parseInt(secondsInput.value, 10) || 0;

    if (inputMinutes === 0 && inputSeconds === 0 && remainingTimer === 0) {
      alert("Por favor, insira pelo menos um valor.");
      return;
    }

    //Se o cronômetro ainda não estiver rodando, inicia o timer
    if (remainingTimer === 0) {
      remainingTimer = inputMinutes * 60 + inputSeconds;
    }

    isRunning = true;
    updateDisplay();

    timer = setInterval(() => {
      if (remainingTimer > 0) {
        remainingTimer--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alarmSound.play();
        alert("Tempo esgotado!");
      }
    }, 1000);

    minutesInput.value = "";
    secondsInput.value = "";
  }

  // Pausa o cronômetro
  function pauseTime() {
    if (!isRunning) return;

    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    remainingTimer = 0;
    updateDisplay();
    minutesInput.value = "";
    secondsInput.value = "";
  }

  startBtn.addEventListener("click", startTime);
  pauseBtn.addEventListener("click", pauseTime);
  resetBtn.addEventListener("click", resetTimer);

  updateDisplay();
});
