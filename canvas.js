const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
let ballColor = '#dadada';
let ballSpeed = 0;
let dx = 1 * ballSpeed;
let dy = -1 * ballSpeed;
let paddleColor = '#dadada';
const paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 11;
const brickColumnCount = 14;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let ballX = canvas.width / 2;
let ballY = canvas.height - paddleHeight - ballRadius;
let score = 0;
let lives = 3;
let gameOver = false;
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const grey = '#dadada';
const violet = '#CC00FF';
const purple = '#8000FF';
const blue = '#0000FF';
const lightBlue = '#0080FF';
const skyBlue = '#00FFFF';
const blueGreen = '#00FF80';
const green = '#00FF00';
const limeGreen = '#80FF00';
const yellow = '#FFFF00';
const orange = '#FF8000';
const red = '#FF0000';
const p = '16px Arial';
const heading = '130px Helvetica';
const bricks = [];

const colorBricks = (r) => {
  switch (r) {
    case 0:
      return violet;
    case 1:
      return purple;
    case 2:
      return blue;
    case 3:
      return lightBlue;
    case 4:
      return skyBlue;
    case 5:
      return blueGreen;
    case 6:
      return green;
    case 7:
      return limeGreen;
    case 8:
      return yellow;
    case 9:
      return orange;
    case 10:
      return red;
    default:
      return red;
  }
};

const createBricks = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      bricks[c][r] = {
        x: 0,
        y: 0,
        status: 1,
        color: colorBricks(r),
      };
    }
  }
};

const keyDownHandler = (e) => {
  if (e.key === RIGHT || e.key === ARROW_RIGHT) {
    rightPressed = true;
  } else if (e.key === LEFT || e.key === ARROW_LEFT) {
    leftPressed = true;
  } else if (e.keyCode === 32 && ballSpeed === 0) {
    if (ballSpeed === 0) {
      ballSpeed = 3;
      dx = 1 * ballSpeed;
      dy = -1 * ballSpeed;
      paddleX = ballX - ballRadius / 2 + paddleWidth / 2;
    } else if (gameOver) {
      document.location.reload();
    }
  }
};

const keyUpHandler = (e) => {
  if (e.key === RIGHT || e.key === ARROW_RIGHT) {
    rightPressed = false;
  } else if (e.key === LEFT || e.key === ARROW_LEFT) {
    leftPressed = false;
  }
};

const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
    if (ballSpeed === 0) {
      ballX = relativeX;
    }
  }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
document.addEventListener('click', () => {
  if (ballSpeed === 0) {
    ballSpeed = 3;
    dx = 1 * ballSpeed;
    dy = -1 * ballSpeed;
  } else if (gameOver) {
    document.location.reload();
  }
});

const resetGame = () => {
  lives -= 1;
  ballColor = grey;
  paddleColor = grey;
  ballSpeed = 3;
  dx = 1 * ballSpeed;
  dy = -1 * ballSpeed;
};

const displayYouWin = () => {
  ctx.beginPath();
  ctx.font = heading;
  ctx.fillStyle = grey;
  const youWinString = 'YOU WIN!';
  const youWinWidth = ctx.measureText(youWinString).width;
  ctx.fillText(youWinString, canvas.width / 2 - youWinWidth / 2, canvas.height / 2);
};

const changeBrickColor = (b) => {
  switch (b.color) {
    case violet:
      return purple;
    case purple:
      return blue;
    case blue:
      return lightBlue;
    case lightBlue:
      return skyBlue;
    case skyBlue:
      return blueGreen;
    case blueGreen:
      return green;
    case green:
      return limeGreen;
    case limeGreen:
      return yellow;
    case yellow:
      return orange;
    case orange:
      return red;
    case red:
      return grey;
    default:
      return grey;
  }
};

const checkIfWon = () => {
  if (score === brickRowCount * brickColumnCount) {
    displayYouWin();
    document.location.reload();
  }
};

const forEachBrick = async (func) => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      [bricks[c][r].color, bricks[c][r].status] = await func(b);
      if (bricks[c][r].status === 0) {
        console.log(bricks[c][r]);
      }
    }
  }
};

const collisionBrick = (b) => {
  let newColor = b.color;
  let newStatus = 1;
  if (b.status === 1) {
    if (
      ballX > b.x
      && ballX < b.x + brickWidth
      && ballY > b.y
      && ballY < b.y + brickHeight + ballRadius
    ) {
      dy = -dy;
      ballColor = b.color;
      score += 1;
      newColor = changeBrickColor(b);
      if (newColor === grey) {
        newStatus = 0;
      }
    }
  }
  return [newColor, newStatus];
};

const collisionBricks = () => {
  forEachBrick(collisionBrick);
  checkIfWon();
};

const collisionWall = () => {
  if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
    ballColor = grey;
  }
};

const collisionTop = () => {
  if (ballY + dy < ballRadius) {
    dy = -dy;
  }
};

const moveBall = () => {
  ballX += dx;
  ballY += dy;
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
};

const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = bricks[c][r].color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

const drawScore = () => {
  ctx.font = p;
  ctx.fillStyle = grey;
  ctx.fillText(`Score: ${score}`, 8, 20);
};

const drawLives = () => {
  ctx.font = p;
  ctx.fillStyle = grey;
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
};

const updateBallSpeed = () => {
  if (dx > 0) {
    dx = 1 * ballSpeed;
  } else {
    dx = -1 * ballSpeed;
  }
  if (dy < 0) {
    dy = -1 * ballSpeed;
  } else {
    dy = 1 * ballSpeed;
  }
};

const resetBall = () => {
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  dx = 2;
  dy = -2;
};

const resetPaddle = () => {
  paddleX = (canvas.width - paddleWidth) / 2;
};

const checkPowerUp = () => {
  switch (paddleColor) {
    case violet:
      ballSpeed += 1;
      updateBallSpeed();
      return ballSpeed;
    case purple:
      ballSpeed += 1;
      updateBallSpeed();
      return ballSpeed;
    case blue:
      ballSpeed -= 1;
      updateBallSpeed();
      return ballSpeed;
    case lightBlue:
      paddleWidth += 20;
      return ballSpeed;
    case skyBlue:
      paddleWidth -= 10;
      return paddleWidth;
    case blueGreen:
      paddleWidth += 10;
      return paddleWidth;
    case green:
      paddleWidth -= 5;
      return paddleWidth;
    case limeGreen:
      paddleWidth += 10;
      return paddleWidth;
    case yellow:
      ballSpeed -= 1;
      updateBallSpeed();
      return ballSpeed;
    case orange:
      paddleWidth += 10;
      return paddleWidth;
    case red:
      ballSpeed += 1;
      updateBallSpeed();
      return ballSpeed;
    default:
      return null;
  }
};

const collisionPaddle = () => {
  if (ballX > paddleX && ballX + ballRadius < paddleX + paddleWidth) {
    dy = -dy;
    paddleColor = ballColor;
    checkPowerUp();
    return true;
  }
  return false;
};

const checkKeys = () => {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
    if (ballSpeed === 0) {
      ballX += 7;
    }
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
    if (ballSpeed === 0) {
      ballX -= 7;
    }
  }
};

const displayGameOver = () => {
  ctx.beginPath();
  ctx.font = heading;
  ctx.fillStyle = grey;
  const gameoverString = 'GAMEOVER';
  const gameoverWidth = ctx.measureText(gameoverString).width;
  ctx.fillText(gameoverString, canvas.width / 2 - gameoverWidth / 2, canvas.height / 2);
  gameOver = true;
};

const drawGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
};

const draw = () => {
  if (!gameOver) {
    drawGame();

    collisionBricks();
    collisionWall();
    collisionTop();
    if (ballY + ballRadius >= canvas.height - paddleHeight && ballSpeed > 0) {
      if (!collisionPaddle()) {
        resetGame();
        if (!lives) {
          displayGameOver();
        } else {
          resetBall();
          resetPaddle();
        }
      }
    }

    moveBall();
    checkKeys();
    requestAnimationFrame(draw);
  }
};

createBricks();
draw();
