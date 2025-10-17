let canvasWidth = 600;
let canvasHeight = 400;
let gravity = 0.4;

let player, block, score, scoreLabel;
let gameRunning = true;
let gameCanvas;

// ================= GAME INITIALISATION =================
function startGame() {
  document.getElementById("restartBtn").style.display = "none";
  score = 0;
  gameRunning = true;

  if (gameCanvas && gameCanvas.interval) clearInterval(gameCanvas.interval);

  gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function () {
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[2]);
      this.interval = setInterval(updateCanvas, 20);
    },
    stop: function () {
      clearInterval(this.interval);
      gameRunning = false;
      const ctx = this.context;
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.fillText("Game Over! Final Score: " + score, 100, 200);
      document.getElementById("restartBtn").style.display = "inline-block";
    },
  };

  player = new Player(50, 65, 10);
  block = new Block();
  scoreLabel = new ScoreLabel(10, 30);

  gameCanvas.start();
}

// ================= CLASSES =================
class Player {
  constructor(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = canvasHeight - height;
    this.velocityY = 0;
    this.isJumping = false;
    this.image = new Image();
    this.image.src = "../character/player.png";
    
  }

  update() {
    this.y += this.velocityY;
    this.velocityY += gravity;

    if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
      this.velocityY = 0;
      this.isJumping = false;
    }
  }

  jump() {
    if (!this.isJumping) {
      this.velocityY = -12;
      this.isJumping = true;
    }
  }

  draw() {
    const ctx = gameCanvas.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Block {
  constructor() {

    this.imagePaths = [
      "../character/penguin_giant.png",
      "../character/1.png",
      "../character/2.png",];

    this.reset();

  }

  reset() {
    this.width = randomNumber(30, 80);
    this.height = randomNumber(50, 130);
    this.x = canvasWidth;
    this.y = canvasHeight - this.height;
    this.speed = randomNumber(4, 9);
    const randomIndex = randomNumber(0, this.imagePaths.length - 1);
    this.image = new Image();
    this.image.src = this.imagePaths[randomIndex];
  }

  update() {
    this.x -= this.speed;
    if (this.x + this.width < 0) {
      this.reset();
      score++;
    }
  }

  draw() {
    const ctx = gameCanvas.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class ScoreLabel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    const ctx = gameCanvas.context;
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, this.x, this.y);
  }
}

// ================= GAME LOGIC =================
function detectCollision() {
  const playerRight = player.x + player.width;
  const playerBottom = player.y + player.height;
  const blockRight = block.x + block.width;
  const blockTop = block.y;

  if (
    playerRight > block.x &&
    player.x < blockRight &&
    playerBottom > blockTop
  ) {
    gameCanvas.stop();
  }
}

function updateCanvas() {
  if (!gameRunning) return;

  const ctx = gameCanvas.context;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  detectCollision();

  player.update();
  block.update();

  player.draw();
  block.draw();
  scoreLabel.draw();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ================= INPUT HANDLING =================
// Press Enter to jump
document.body.onkeyup = function (e) {
  if (e.code === "Enter" && gameRunning) player.jump();
};

// ================= RESTART BUTTON =================
document.getElementById("restartBtn").onclick = function () {
  if (gameCanvas && gameCanvas.canvas) gameCanvas.canvas.remove();
  startGame();
};
