
let canvas = document.getElementById('gameCanvas'); 
let ctx = canvas.getContext('2d');

let keys = {};

window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});


///////////// Start of Game code ////////////////////

// Game properties
const boxSize = 50;
let boxX = (canvas.width - boxSize) / 2;
let boxY = (canvas.height - boxSize) / 2;
const moveSpeed = 5;


function gameLoop(){
  if (keys['ArrowUp'] && boxY > 0) {
      boxY -= moveSpeed;
    }
    if (keys['ArrowDown'] && boxY < canvas.height - boxSize) {
      boxY += moveSpeed;
    }
    if (keys['ArrowLeft'] && boxX > 0) {
      boxX -= moveSpeed;
    }
    if (keys['ArrowRight'] && boxX < canvas.width - boxSize) {
      boxX += moveSpeed;
    }
}

function drawStuff(){
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

     

    // Draw the box
    ctx.fillStyle = '#00F';
    ctx.fillRect(boxX, boxY, boxSize, boxSize);
  
}
