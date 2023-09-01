//block
var blockSize = 25;
var rows = 20;
var cols = 20; 
var board;
var context;


/// snake head
 var snakeX = blockSize * 5;
 var snakeY = blockSize * 5; 

 var VelocityX = 0;
 var VelocityY = 0;


 /// food
 var foodX 
 var foodY 
 var gameOver = false;
 var snakeBody = [];


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width  = cols * blockSize;
    context = board.getContext("2d");// for drwaing the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update 
    setInterval(update, 1000/10);
}
function update(){
    if (gameOver){
        return;
    }
context.fillStyle = "black";
context.fillRect(0, 0, board.width, board.height); 

context.fillStyle = "red";
context.fillRect(foodX,foodY,blockSize,blockSize);

if (snakeX == foodX && snakeY == foodY){
    snakeBody.push([foodX,foodY]);
    placeFood();
}
for( let i = snakeBody.length-1; i > 0; i--){
    snakeBody[i] = snakeBody[i-1];
}

if (snakeBody.length){
    snakeBody[0] = [snakeX,snakeY];
}
context.fillStyle = "lime";
context.fillRect(snakeX,snakeY,blockSize,blockSize);
snakeX += VelocityX * blockSize;
snakeY += VelocityY * blockSize;
for(let i = 0; i < snakeBody.length; i++){
    context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
}

//// gameOver condition
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length;i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
}


function changeDirection(e){
    if (e.code == "ArrowUp" && VelocityY != 1){
        VelocityX = 0;
        VelocityY = -1;
    }
    else if (e.code == "ArrowDown"  && VelocityY != -1){
        VelocityX = 0;
        VelocityY = 1;
    }
    else if (e.code == "ArrowLeft" && VelocityX != 1){
        VelocityX = -1;
        VelocityY = 0;
    }
    else if (e.code == "ArrowRight" && VelocityX !=-1){
        VelocityX = 1;
        VelocityY = 0;
    }
}

function placeFood (){
foodX = Math.floor(Math.random() * cols) * blockSize;
foodY = Math.floor(Math.random() * rows) * blockSize;
}
