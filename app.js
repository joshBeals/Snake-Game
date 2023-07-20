const gameBoard = document.querySelector("#board");
const ctx = gameBoard.getContext("2d");
const scoreTxt = document.querySelector("#score");
const resetBtn = document.querySelector("#reset");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "white";
const snakeColor = "blue";
const snakeBorder = "black";

const foodColor = "red";
let foodX;
let foodY;

const size = 25;

let running = false;
let xVelocity = size;
let yVelocity = 0;
let score = 0;

let snake = [
    {x: size * 3, y: 0},
    {x: size * 2, y: 0},
    {x: size, y: 0}
]

function gameStart(){
    running = true;
    createFood();
    drawFood();
    nextMotion();
}

function nextMotion(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkCollision();
            nextMotion();
        }, 100);
    }
}

function checkCollision(){
    if(snake[0].x < 0){
        running = false;
    }
    if(snake[0].y < 0){
        running = false;
    }
    if(snake[0].x >= gameWidth){
        running = false;
    }
    if(snake[0].y >= gameHeight){
        running = false;
    }

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            running = false;
        }
    }
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    for(let i = 0; i < snake.length; i++){
        ctx.fillRect(snake[i].x, snake[i].y, size, size);
        ctx.strokeRect(snake[i].x, snake[i].y, size, size);
    }
}

function moveSnake(){
    const newHead = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity }
    snake.unshift(newHead);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        scoreTxt.innerHTML = score;
        createFood();
    }else{
        snake.pop();
    }
}

window.addEventListener("keydown", changeDirection);

function changeDirection(event){
    const keyPressed =  event.key;

    const goingUp = yVelocity == -size;
    const goingDown = yVelocity == size;
    const goingLeft = xVelocity == -size;
    const goingRight = xVelocity == size;

    if(keyPressed == 'w' && !goingDown){
        xVelocity = 0;
        yVelocity = -size;
    }

    if(keyPressed == 'a' && !goingRight){
        xVelocity = -size;
        yVelocity = 0;
    }

    if(keyPressed == 's' && !goingUp){
        xVelocity = 0;
        yVelocity = size;
    }

    if(keyPressed == 'd' && !goingLeft){
        xVelocity = size;
        yVelocity = 0;
    }
}

function createFood(){
    function randomFood(min, max){
        const rand = Math.round((Math.random() * (max - min) + min) / size) * size;
        return rand;
    }
    foodX = randomFood(0, gameWidth - size);
    foodY = randomFood(0, gameHeight - size);
}

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, size, size);
}

gameStart();
