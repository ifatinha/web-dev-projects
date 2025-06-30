document.addEventListener("DOMContentLoaded", function () {
  // Seleciona o elemento <canvas> do HTML onde o jogo será desenhado
  const gameCanvas = document.querySelector("#gameCanvas");

  // Verifica se o elemento <canvas> foi encontrado
  if (!gameCanvas) {
    console.error("Canvas element not found!");
    return;
  }

  // Obtém o contexto 2D do canvas, necessário para desenhar formas e imagens
  const ctx = gameCanvas.getContext("2d");

  // Define o tamanho de cada "quadrado" da grade do jogo (20 pixels)
  const box = 20;

  // Define o tamanho total do canvas (400x400 pixels)
  const canvaSize = 400;

  // Variável para armazenar a pontuação do jogador
  let score = 0;

  // Array que representa a cobrinha, começando com um segmento no centro
  let snake = [{ x: 5 * box, y: 5 * box }];

  // Direção inicial da cobrinha (direita)
  let direction = "RIGHT";

  // Gera a posição inicial da comida de forma aleatória dentro do canvas
  let food = {
    x: Math.floor(Math.random() * (canvaSize / box)) * box, // posição X aleatória
    y: Math.floor(Math.random() * (canvaSize / box)) * box, // posição Y aleatória
  };

  // Função para desenhar a cobrinha no canvas
  function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "#00ff6a" : "#39ff14"; // Cor do corpo da cobrinha
      ctx.fillRect(snake[i].x, snake[i].y, box, box); // Desenha cada segmento da cobrinha
    }
  }

  // Função para pintar o fundo do canvas
  function drawBackground() {
    ctx.fillStyle = "#000"; // Cor de fundo preta
    ctx.fillRect(0, 0, canvaSize, canvaSize); // Preenche o canvas com a cor de fundo
  }

  // Função para desenhar a comida no canvas
  function drawFood() {
    ctx.fillStyle = "#ff3c00"; // Cor da comida (vermelha)
    ctx.fillRect(food.x, food.y, box, box); // Desenha a comida
  }

  

});
