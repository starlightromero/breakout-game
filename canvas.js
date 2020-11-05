const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

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
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';

class Bricks {
  constructor() {
    this.bricks = [];
    this.rowCount = 11;
    this.columnCount = 14;
    this.width = 75;
    this.height = 20;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
  }

  color(r) {
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
  }

  show() {
    for (let c = 0; c < this.columnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rowCount; r += 1) {
        this.bricks[c][r] = {
          x: 0,
          y: 0,
          status: 1,
          color: this.color(r),
        };
      }
    }
  }

  collision() {
    for (let c = 0; c < this.columnCount; c += 1) {
      for (let r = 0; r < this.rowCount; r += 1) {
        const b = this.bricks[c][r];
        if (b.status === 1) {
          if (
            ball.x > b.x
            && ball.x < b.x + this.width
            && ball.y > b.y
            && ball.y < b.y + this.height + ball.radius
          ) {
            ball.dy = -ball.dy;
            game.score += 1;
            ball.color = b.color;
            b.status = 0;
            game.checkIfWon();
          }
        }
      }
    }
  }

  draw() {
    for (let c = 0; c < this.columnCount; c += 1) {
      for (let r = 0; r < this.rowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          const brickX = (c * (this.width + this.padding)) + this.offsetLeft;
          const brickY = (r * (this.height + this.padding)) + this.offsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, this.width, this.height);
          ctx.fillStyle = this.bricks[c][r].color;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}

class Ball {
  constructor(paddle) {
    this.radius = 10;
    this.color = '#dadada';
    this.speed = 0;
    this.dx = 1 * this.speed;
    this.dy = -1 * this.speed;
    this.x = canvas.width / 2;
    this.y = canvas.height - paddle.height - this.radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  updateSpeed() {
    if (this.dx > 0) {
      this.dx = 1 * this.speed;
    } else {
      this.dx = -1 * this.speed;
    }
    if (this.dy < 0) {
      this.dy = -1 * this.speed;
    } else {
      this.dy = 1 * this.speed;
    }
  }

  reset() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.dx = 2;
    this.dy = -2;
  }
}

class Paddle {
  constructor() {
    this.color = grey;
    this.height = 10;
    this.width = 75;
    this.x = (canvas.width - this.width) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
  }

  checkKeys() {
    if (this.rightPressed && this.x < canvas.width - this.width) {
      this.x += 7;
      if (ball.speed === 0) {
        ball.x += 7;
      }
    } else if (this.leftPressed && this.x > 0) {
      this.x -= 7;
      if (ball.speed === 0) {
        ball.x -= 7;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  collision() {
    if (ball.x > this.x && ball.x + ball.radius < this.x + this.width) {
      ball.dy = -ball.dy;
      this.color = ball.color;
      checkPowerUp();
      return true;
    }
    return false;
  }

  reset() {
    this.x = (canvas.width - this.width) / 2;
  }
}

class Game {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.over = false;
  }

  displayYouWin() {
    ctx.beginPath();
    ctx.font = heading;
    ctx.fillStyle = grey;
    const youWinString = 'YOU WIN!';
    const youWinWidth = ctx.measureText(youWinString).width;
    ctx.fillText(
      youWinString, canvas.width / 2 - youWinWidth / 2, canvas.height / 2,
    );
  }

  checkIfWon() {
    if (this.score === bricks.rowCount * bricks.columnCount) {
      this.displayYouWin();
      document.location.reload();
    }
  }

  reset() {
    this.lives -= 1;
    ball.color = grey;
    paddle.color = grey;
    ball.speed = 3;
    ball.dx = 1 * ball.speed;
    ball.dy = -1 * ball.speed;
  }

  drawScore() {
    ctx.font = p;
    ctx.fillStyle = grey;
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }

  drawLives() {
    ctx.font = p;
    ctx.fillStyle = grey;
    ctx.fillText(`Lives: ${this.lives}`, canvas.width - 65, 20);
  }

  drawGameOver() {
    ctx.beginPath();
    ctx.font = heading;
    ctx.fillStyle = grey;
    const gameoverString = 'GAMEOVER';
    const gameoverWidth = ctx.measureText(gameoverString).width;
    ctx.fillText(
      gameoverString, canvas.width / 2 - gameoverWidth / 2, canvas.height / 2,
    );
    this.over = true;
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bricks.draw();
    ball.draw();
    paddle.draw();
    this.drawScore();
    this.drawLives();
  }
}

const bricks = new Bricks();

const paddle = new Paddle();

const ball = new Ball(paddle);

const game = new Game();

const keyDownHandler = (e) => {
  if (e.key === RIGHT || e.key === ARROW_RIGHT) {
    paddle.rightPressed = true;
  } else if (e.key === LEFT || e.key === ARROW_LEFT) {
    paddle.leftPressed = true;
  } else if (e.keyCode === 32 && ball.speed === 0) {
    if (ball.speed === 0) {
      ball.speed = 3;
      ball.dx = 1 * ball.speed;
      ball.dy = -1 * ball.speed;
      paddle.x = ball.x - ball.radius / 2 + paddle.width / 2;
    } else if (game.over) {
      document.location.reload();
    }
  }
};

const keyUpHandler = (e) => {
  if (e.key === RIGHT || e.key === ARROW_RIGHT) {
    paddle.rightPressed = false;
  } else if (e.key === LEFT || e.key === ARROW_LEFT) {
    paddle.leftPressed = false;
  }
};

const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
    if (ball.speed === 0) {
      ball.x = relativeX;
    }
  }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
document.addEventListener('click', () => {
  if (ball.speed === 0) {
    ball.speed = 3;
    ball.dx = 1 * ball.speed;
    ball.dy = -1 * ball.speed;
  } else if (game.over) {
    document.location.reload();
  }
});

const collisionWall = () => {
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
    ball.color = grey;
  }
};

const collisionTop = () => {
  if (ball.y + ball.dy < ball.rcadius) {
    ball.dy = -ball.dy;
  }
};

const checkPowerUp = () => {
  switch (paddle.color) {
    case violet:
      ball.speed += 1;
      ball.updateSpeed();
      return ball.speed;
    case purple:
      ball.speed += 1;
      ball.updateSpeed();
      return ball.speed;
    case blue:
      ball.speed -= 1;
      ball.updateSpeed();
      return ball.speed;
    case lightBlue:
      paddle.width += 20;
      return ball.speed;
    case skyBlue:
      paddle.width -= 10;
      return paddle.width;
    case blueGreen:
      paddle.width += 10;
      return paddle.width;
    case green:
      paddle.width -= 5;
      return paddle.width;
    case limeGreen:
      paddle.width += 10;
      return paddle.width;
    case yellow:
      ball.speed -= 1;
      ball.updateSpeed();
      return ball.speed;
    case orange:
      paddle.width += 10;
      return paddle.width;
    case red:
      ball.speed += 1;
      ball.updateSpeed();
      return ball.speed;
    default:
      return null;
  }
};

const draw = () => {
  if (!game.over) {
    game.draw();

    bricks.collision();
    collisionWall();
    collisionTop();
    if (ball.y + ball.radius >= canvas.height - paddle.height && ball.speed > 0) {
      if (!paddle.collision()) {
        game.reset();
        if (!game.lives) {
          game.drawGameOver();
        } else {
          ball.reset();
          paddle.reset();
        }
      }
    }

    ball.move();
    paddle.checkKeys();
    requestAnimationFrame(draw);
  }
};

bricks.show();
draw();
