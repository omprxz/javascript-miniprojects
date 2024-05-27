const gameBoard = document.getElementById('gameBoard')
const ctx = gameBoard.getContext('2d')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const scoreText = document.getElementById('scoreText')
const resetBtn = document.getElementById('resetBtn')
const startBtn = document.getElementById('startBtn')
const body = document.body
const keys = document.querySelectorAll('.key')

let unit = 15;
let boardColor = 'white';
let snakeColor = 'lightgreen';
let snakeStrokeColor = 'black';
let foodColor = 'red';
let foodX, foodY;

let score = 0;
let level;
let playing = false;
let xVel = unit;
let yVel = 0;
let snake = [{
  x: unit*4,
  y: 0
},
  {
    x: unit*3,
    y: 0
  },
  {
    x: unit*2,
    y: 0
  },
  {
    x: unit*1,
    y: 0
  },
  {
    x: 0,
    y: 0
  }]
ctx.font = '60px "Pacifico", cursive'
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Start', gameWidth/2, gameHeight/2)

function startGame() {
  playing = true
  clearBoard()
  level=prompt('Choose level (1,2,3,4,5,6....):')
  createFood()
  drawFood()
  drawSnake()
  nextTick()
  startBtn.style.display = 'none'
  resetBtn.style.display = 'inline-block'
}

function nextTick() {
  if (playing) {
    setTimeout(()=> {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, level*500)
  } else {
    displayGameOver();
  }

}
function clearBoard() {
  ctx.fillStyle = boardColor;
  ctx.fillRect(0, 0, gameWidth, gameHeight)
}
function createFood() {
  foodX = Math.ceil(Math.random()*(gameWidth/unit - 1))*unit
  foodY = Math.ceil(Math.random()*(gameHeight/unit - 1))*unit
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unit, unit)
}
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit)
    ctx.strokeStyle = snakeStrokeColor
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit)
  }
}
function moveSnake() {
  head = {
    x: snake[0].x+xVel,
    y: snake[0].y+yVel
  };
  snake.unshift(head)
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood()
  } else {
    snake.pop()
  }
}
function changeDirection(d) {
  cl(d)
  if (d == 'up' && yVel <= 0) {
    xVel = 0;
    yVel=-unit;
    cl('up')
  } else if (d == 'down' && yVel >= 0) {
    xVel = 0
    yVel = unit
    cl('down')
  } else if (d == 'right' && xVel >= 0) {
    yVel = 0
    xVel = unit
    cl('right')
  } else if (d == 'left' && xVel <= 0) {
    yVel = 0
    xVel=-unit
    cl('left')
  }
}
function checkGameOver() {
  if (snake[0].x < 0 || snake[0].x >= gameWidth || snake[0].y < 0 || snake[0].y >= gameHeight) {
    playing = false;
  }
  for(let z=1;z<snake.length;z++){
    if(snake[0].x == snake[z].x && snake[0].y == snake[z].y){
      playing = false;
    }
  }
}
function displayGameOver() {
  ctx.font = '60px "Pacifico", cursive'
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Game Over', gameWidth/2, gameHeight/2)
  ctx.font = '20px "Pacifico"'
  ctx.fillText('Your score is '+score, gameWidth/2, gameHeight/2 + 50)
}
function reset() {
  score = 0;
  playing = false;
  xVel = unit;
  yVel = 0;
  snake = [{
    x: unit*4,
    y: 0
  },
    {
      x: unit*3,
      y: 0
    },
    {
      x: unit*2,
      y: 0
    },
    {
      x: unit*1,
      y: 0
    },
    {
      x: 0,
      y: 0
    }]
  startBtn.style.display='inline-block'
  resetBtn.style.display='none'
  clearBoard()
  ctx.font = '60px "Pacifico", cursive'
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Start Again', gameWidth/2, gameHeight/2)
  scoreText.textContent=score

}

function cl(...zz) {
  console.log(...zz);
}