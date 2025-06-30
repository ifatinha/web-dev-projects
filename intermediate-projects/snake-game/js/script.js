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

  // Aqui você pode adicionar o restante da lógica do jogo, como desenhar a cobrinha,
  // mover, detectar colisões, controlar o teclado, etc.
});
