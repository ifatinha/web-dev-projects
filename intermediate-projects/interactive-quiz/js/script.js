import { quizData } from "./questions.js";
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos do DOM
  const questionEl = document.querySelector("#question");
  const answersEl = document.querySelector("#answer-buttons");
  const nextButton = document.querySelector("#next-btn");
  const scoreBox = document.querySelector("#score-box");
  const scoreEl = document.querySelector("#score");
  const restartButton = document.querySelector("#restart-btn");

  // Váriaveis para controlar o estado do quiz
  let currentQuestionIndex = 0;
  let score = 0;

  // Função para selecionar a resposta
  function selectAnswer(ev) {
    const selectBtn = ev.currentTarget;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
      selectBtn.classList.add("correct");
      score++;
    } else {
      selectBtn.classList.add("wrong");
    }

    // Desabilita todos os botões de resposta
    Array.from(answersEl.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });

    nextButton.style.display = "block";
  }

  // Função para reiniciar o quiz
  function resetState() {
    nextButton.style.display = "none";
    answersEl.innerHTML = "";
  }

  // Função para mostrar a pergunta atual
  function showQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");

      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }

      button.addEventListener("click", selectAnswer);
      answersEl.appendChild(button);
    });
  }

  // Mostrar a próxima pergunta ou finalizar o quiz
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      showScore();
    }
  });

  // Função para mostrar a pontuação final
  function showScore() {
    questionEl.textContent = "Quiz Finalizado!";
    answersEl.innerHTML = "";
    nextButton.style.display = "none";
    scoreBox.classList.remove("hidden");
    scoreEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas.`;
  }

  // Função para carregar a próxima pergunta
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreBox.classList.add("hidden");
    nextButton.style.display = "none";
    showQuestion();
  }

  restartButton.addEventListener("click", startQuiz);
});
