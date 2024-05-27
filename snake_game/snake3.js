const gameBoard = document.getElementById('gameBoard')
const ctx = gameBoard.getContext('2d')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const scoreText = document.getElementById('scoreText')
const resetBtn = document.getElementById('resetBtn')
const startBtn = document.getElementById('startBtn')
const body = document.body

let blockSize = 20
let blockX = gameHeight / blockSize
let blockY = gameWidth / blockSize
let startX = blockSize * 8
let startY = blockSize * 3

let gameOver = true;
let speedX = 0, speedY = 1, speed;
let snakeSizeX = blockSize
let snakeSizeY = blockSize * 3
let score=0;


speedX = 0, speedY = 1
snakeSizeX = blockSize
snakeSizeY = blockSize * 3
gameOver = true
startX = blockSize * 8
startY = blockSize * 3


boardColor = 'red'
snakeColor = 'blue'
foodColor = 'lightgreen'

ctx.fillStyle = boardColor
ctx.fillRect(0, 0, gameWidth, gameHeight)

startBtn.onclick = start
function start() {
    if(gameOver){
    gameOver = false

    foodX = startX
    foodY = snakeSizeY + blockSize * 6
    generateFood()
    }
}

/*
updateBoard
updateSnake
updateFood
moveSnake
changeDir
checkgameOver
restartGame

*/


// foodX=blockSize*Math.floor(Math.random()*blockX)
// foodY=blockSize*Math.floor(Math.random()*blockY)

function updateBoard() {
    if (!gameOver) {
        if (speedX != 0) {
            axis = "x"
            dir = speedX
        } else if (speedY != 0) {
            axis = "y"
            dir = speedY
        }
        moveSnake(axis, dir)
        updateSnake(axis, dir)
        checkgameOver()
        updateScore()
    } else {
        return;
    }
}

function updateSnake(axis, dir) {
    if (axis == 'x') {
        if (startY == foodY && snakeSizeX + startX - blockSize == foodX) {
            if (dir == 1) {
                snakeSizeX += blockSize
            } else if (dir == -1) {
                snakeSizeX += blockSize
                startX -= blockSize
            }
            console.log("Ate X")
            score+=1;
            generateFoodPos()
            generateFood()
        }
    } else if (axis == 'y') {
        if (startX == foodX && snakeSizeY + startY - blockSize == foodY) {
            if (dir == 1) {
                snakeSizeY += blockSize
            } else if (dir == -1) {
                snakeSizeY += blockSize
                startY -= blockSize
            }

            console.log('Ate Y')
            score+=1;
            generateFoodPos()
            generateFood()
        }
    }

    cl(snakeSizeX / blockSize, snakeSizeY / blockSize)
}


function moveSnake() {

    ctx.fillStyle = boardColor
    ctx.fillRect(0, 0, gameWidth, gameHeight)
    generateFood()

    if (speedX == 1 || speedY == 1) {
        ctx.clearRect(startX, startY, blockSize, blockSize)
        ctx.fillStyle = boardColor
        ctx.fillRect(startX, startY, blockSize, blockSize)
    } else if (speedX == -1) {
        ctx.clearRect(snakeSizeX + startX, startY, blockSize, blockSize)
        ctx.fillStyle = boardColor
        ctx.fillRect(snakeSizeX + startX, startY, blockSize, blockSize)
    } else if (speedY == -1) {
        ctx.clearRect(startX, snakeSizeY + startY, blockSize, blockSize)
        ctx.fillStyle = boardColor
        ctx.fillRect(startX, snakeSizeY + startY, blockSize, blockSize)
    }

    if (axis == 'x') {
        console.log(dir)
        if (dir == 1) {
            startX += blockSize
        } else if (dir == -1) {
            startX -= blockSize
        }
    } else if (axis == 'y') {
        if (dir == 1) {
            startY += blockSize
        } else if (dir == -1) {
            startY -= blockSize
        }
    }
    ctx.fillStyle = snakeColor
    ctx.fillRect(startX, startY, snakeSizeX, snakeSizeY)
}


body.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        console.log("Arrow Up key clicked")
        if (speedX != 0) {
            speedX = 0, speedY = -1
            psnakeSizeY = snakeSizeY
            snakeSizeY = snakeSizeX
            snakeSizeX = psnakeSizeY
        }
    } else if (event.key === "ArrowDown") {
        console.log("Arrow Down key clicked")
        if (speedX != 0) {
            speedX = 0, speedY = 1
            psnakeSizeY = snakeSizeY
            snakeSizeY = snakeSizeX
            snakeSizeX = psnakeSizeY
        }
    } else if (event.key === "ArrowRight") {
        console.log("Arrow Right key clicked")
        if (speedY != 0) {
            speedY = 0, speedX = 1
            snakeSizeX = snakeSizeY
            snakeSizeY = blockSize
        }
    } else if (event.key === "ArrowLeft") {
        console.log("Arrow Left key clicked")
        if (speedY != 0) {
            speedY = 0, speedX = -1
            snakeSizeX = snakeSizeY
            snakeSizeY = blockSize
        }
    } else if (event.key === "Enter") {
        start()
    }

})




function generateFood() {
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX, foodY, blockSize, blockSize)
    console.log(foodX, foodY)
}
function generateFoodPos() {
    foodX = blockSize * Math.floor(Math.random() * blockX)
    foodY = blockSize * Math.floor(Math.random() * blockY)
}




let intUpd = setInterval(updateBoard, 300)

function checkgameOver() {
    if (startX < 0 || startX+snakeSizeX > gameWidth || startY < 0 || startY+snakeSizeY > gameHeight) {
        cl("Game Over")
        clearInterval(intUpd)
        score=0;
        speedX = 0, speedY = 1
        snakeSizeX = blockSize
        snakeSizeY = blockSize * 3
        gameOver = true
        startX = blockSize * 8
        startY = blockSize * 3
        ctx.fillStyle = boardColor
        ctx.fillRect(0, 0, gameWidth, gameHeight)

    }
}

function updateScore(){
    scoreText.textContent=score;
}



function cl(...zz) {
    console.log(...zz);
}