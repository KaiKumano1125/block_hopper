var canvasWidth = 600;
var canvasHeight = 400;

var player;
var playerYPosition = 200;

var fallSpeed = 0;
var interval = setInterval(updateCanvas, 20);

var isJumping = false;
var jumpSpeed = 0;

var block;

// Create a score of 0 to start with
var score = 0;
// Create a variable to hold our scoreLabel
var scoreLabel;

function startGame() {
    gameCanvas.start();
    player = new createPlayer(30, 30, 10);
    block = new createBlock();
    // Assign your scoreLabel variable a value from scoreLabel()
    scoreLabel = new createScoreLabel(10, 30);
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function createBlock() {
    // Block properties and methods can be defined here
}

function createScoreLabel(x, y) {
    this.x = x;
    this.y = y;
    
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, this.x, this.y);
    }
}

function updateCanvas() {
    gameCanvas.context.clearRect(0, 0, canvasWidth, canvasHeight);
    player.draw();
    block.draw();
    scoreLabel.draw();
    // Additional game logic can be added here
}