document.addEventListener("DOMContentLoaded", function () {
  /** Etapa 1: Variáveis e configurações iniciais */

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

  let gameStarted = false; // Variável para controlar o estado do jogo
  let game; // Variável para armazenar o intervalo do jogo

  /** Etapa 2: Desenhar no canvas */

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

  /** Etapa 3: Controle com teclado */

  // Função para atualizar a direção da cobrinha com base na tecla pressionada
  function updateDirection(ev) {
    const key = ev.keyCode; // Obtém o código da tecla pressionada

    // Verifica a tecla pressionada e atualiza a direção da cobrinha
    // Assegura que a cobrinha não possa se mover na direção oposta imediatamente
    if (key === 38 && direction !== "DOWN") {
      direction = "UP"; // Cima
    } else if (key === 40 && direction !== "UP") {
      direction = "DOWN"; // Baixo
    } else if (key === 37 && direction !== "RIGHT") {
      direction = "LEFT"; // Esquerda
    } else if (key === 39 && direction !== "LEFT") {
      direction = "RIGHT"; // Direita
    }
  }

  document.addEventListener("keydown", updateDirection);

  /** Etapa 4: Lógica do jogo */
  // Função para verificar colisão da cabeça da cobrinha com o corpo
  function isColision(head, body) {
    for (let i = 0; i < body.length; i++) {
      if (head.x === body[i].x && head.y === body[i].y) {
        return true; // Retorna true se a cabeça colidir com qualquer parte do corpo
      }
    }

    return false; // Retorna false se não houver colisão
  }

  // Função para gerar nova comida em uma posição aleatória
  function generatedFood() {
    food = {
      x: Math.floor(Math.random() * (canvaSize / box)) * box, // posição X aleatória
      y: Math.floor(Math.random() * (canvaSize / box)) * box, // posição Y aleatória
    };

    // Verifica se a nova comida colide com a cobrinha
    while (isColision(food, snake)) {
      // Se colidir, gera uma nova posição até que não haja colisão
      food = {
        x: Math.floor(Math.random() * (canvaSize / box)) * box,
        y: Math.floor(Math.random() * (canvaSize / box)) * box,
      };
    }
  }

  // Função principal que atualiza o jogo a cada 100ms
  function gameLoop() {
    drawBackground(); // Desenha o fundo do canvas
    drawSnake(); // Desenha a cobrinha
    drawFood(); // Desenha a comida

    let head = { ...snake[0] }; // Cria uma cópia da cabeça da cobrinha

    // Atualiza a posição da cabeça da cobrinha com base na direção
    if (direction === "RIGHT") {
      head.x += box;
    } else if (direction === "LEFT") {
      head.x -= box;
    } else if (direction === "UP") {
      head.y -= box;
    } else if (direction === "DOWN") {
      head.y += box;
    }

    // Verifica colisão com as bordas do canvas ou com o próprio corpo
    if (
      head.x < 0 ||
      head.x >= canvaSize ||
      head.y < 0 ||
      head.y >= canvaSize ||
      isColision(head, snake) // Chama a função de colisão
    ) {
      clearInterval(game); // Para o jogo se houver colisão
      gameStarted = false; // Reseta o estado do jogo
      alert("💀 Fim de jogo! Sua pontuação: " + score);
      return; // Sai da função se o jogo terminar
    }

    // Verifica se comeu a comida
    if (head.x === food.x && head.y === food.y) {
      score++; // Incrementa a pontuação
      document.querySelector("#score").textContent = score; // Atualiza o display da pontuação
      generatedFood(); // Gera nova comida
    } else {
      snake.pop(); // Remove o último segmento da cobrinha se não comeu
    }

    // Adiciona a nova cabeça à frente da cobrinha
    snake.unshift(head);
    console.log("Snake head position:", head); // Log para depuração
  }

  // Função para iniciar o jogo
  function startGame() {
    if (!gameStarted) {
      gameStarted = true; // Define o estado do jogo como iniciado
      snake = [{ x: 5 * box, y: 5 * box }]; // Reseta a cobrinha para o início
      direction = "RIGHT"; // Reseta a direção para a direita
      score = 0; // Reseta a pontuação
      document.querySelector("#score").textContent = score; // Reseta o display da pontuação
      generatedFood(); // Gera a primeira comida
      game = setInterval(gameLoop, 150); // Inicia o loop do jogo a cada 150ms
      console.log("Game started!"); // Log para depuração
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !gameStarted) {
      startGame(); // Inicia o jogo ao pressionar Enter
    }
  });
});
