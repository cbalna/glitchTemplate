

console.log(car)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game properties
const boxSize = 50;
let boxX = (canvas.width - boxSize) / 2;
let boxY = (canvas.height - boxSize) / 2;
const moveSpeed = 5;

// Keyboard input handling
const keys = {};

window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});


let lastFrameTime = 0.0;
const targetLogicRate = 16.6666; // Desired logic update rate in milliseconds 16.6666 = 60fps
let totalLag = 0.0;

// Game loop
function drawLoop(currentTime) {
 
  
   // Calculate time elapsed since the last frame
  const elapsed = currentTime - lastFrameTime;

  // Update game logic based on elapsed time
  updateGameLogic(elapsed);

  // Save the current time for the next frame
  lastFrameTime = currentTime;

  // Schedule the next frame

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

     

    // Draw the box
    ctx.fillStyle = '#00F';
    ctx.fillRect(boxX, boxY, boxSize, boxSize);
 
  // Request the next frame
  requestAnimationFrame(drawLoop);
}
//Basically we want to draw every frame, but update x number of times per draw.
// if the elapsed time since the last frame is greater than the targetLogicRate, you run the game logic n times
// How many times? it depends how many multipliers of the targetLogicRate the elapsed time is
// What if theres a bit left over? We store that in totalLag and that carries across.
// If the elapsed time since the last frame is actually less than targetLogicRate, then we dont want to update the logic, BUT
// BUT if the elapsed time is always less we would never update the logic, which again is the benefit of totalLag,
// it carries over the leftover time until its equal to a whole targetLogicRate
function updateGameLogic(elapsed) {
  let totalElapsed = elapsed + totalLag;
  while(totalElapsed >= targetLogicRate){
    // Update your game logic here
    gameLoop();
    // Subtract the target rate from the elapsed time
    totalElapsed -= targetLogicRate;
  } 
  totalLag = totalElapsed;
}


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


// Start the game loop
requestAnimationFrame(drawLoop);
