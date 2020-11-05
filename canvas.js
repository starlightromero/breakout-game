const Bricks = require('./Components/Bricks');

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const p = '16px Arial';
const heading = '130px Helvetica';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';

class Game {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.over = false;
    this.bricks = new Bricks();
    this.paddle = new Paddle(canvas);
    this.ball = new Ball(canvas, this.paddle);
  }

  static displayYouWin() {
    ctx.beginPath();
    ctx.font = heading;
    ctx.fillStyle = Colors.grey;
    const youWinString = 'YOU WIN!';
    const youWinWidth = ctx.measureText(youWinString).width;
    ctx.fillText(
      youWinString, canvas.width / 2 - youWinWidth / 2, canvas.height / 2,
    );
  }

  checkIfWon() {
    if (this.score === this.bricks.rowCount * this.bricks.columnCount) {
      this.displayYouWin();
      document.location.reload();
    }
  }

  reset() {
    this.lives -= 1;
    this.ball.color = Colors.grey;
    this.paddle.color = Colors.grey;
    this.ball.speed = 3;
    this.ball.dx = 1 * this.ball.speed;
    this.ball.dy = -1 * this.ball.speed;
  }

  drawScore() {
    ctx.font = p;
    ctx.fillStyle = Colors.grey;
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }

  drawLives() {
    ctx.font = p;
    ctx.fillStyle = Colors.grey;
    ctx.fillText(`Lives: ${this.lives}`, canvas.width - 65, 20);
  }

  drawGameOver() {
    ctx.beginPath();
    ctx.font = heading;
    ctx.fillStyle = Colors.grey;
    const gameoverString = 'GAMEOVER';
    const gameoverWidth = ctx.measureText(gameoverString).width;
    ctx.fillText(
      gameoverString, canvas.width / 2 - gameoverWidth / 2, canvas.height / 2,
    );
    this.over = true;
  }

  collisionWall() {
    if (
      this.ball.x + this.ball.dx > canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius
    ) {
      this.ball.dx = -this.ball.dx;
      this.ball.color = Colors.grey;
    }
  }

  collisionTop() {
    if (this.ball.y + this.ball.dy < this.ball.rcadius) {
      this.ball.dy = -this.ball.dy;
    }
  }

  checkPowerUp() {
    switch (this.paddle.color) {
      case Colors.violet:
        this.ball.speed += 1;
        this.ball.updateSpeed();
        return this.ball.speed;
      case Colors.purple:
        this.ball.speed += 1;
        this.ball.updateSpeed();
        return this.ball.speed;
      case Colors.blue:
        this.ball.speed -= 1;
        this.ball.updateSpeed();
        return this.ball.speed;
      case Colors.lightBlue:
        this.paddle.width += 20;
        return this.ball.speed;
      case Colors.skyBlue:
        this.paddle.width -= 10;
        return this.paddle.width;
      case Colors.blueGreen:
        this.paddle.width += 10;
        return this.paddle.width;
      case Colors.green:
        this.paddle.width -= 5;
        return this.paddle.width;
      case Colors.limeGreen:
        this.paddle.width += 10;
        return this.paddle.width;
      case Colors.yellow:
        this.ball.speed -= 1;
        this.ball.updateSpeed();
        return this.ball.speed;
      case Colors.orange:
        this.paddle.width += 10;
        return this.paddle.width;
      case Colors.red:
        this.ball.speed += 1;
        this.ball.updateSpeed();
        return this.ball.speed;
      default:
        return null;
    }
  }

  draw() {
    if (!this.over) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.bricks.draw();
      this.ball.draw();
      this.paddle.draw();
      this.drawScore();
      this.drawLives();

      this.bricks.collision();
      this.collisionWall();
      this.collisionTop();
      if (
        this.ball.y + this.ball.radius >= canvas.height - this.paddle.height && this.ball.speed > 0
      ) {
        if (!this.paddle.collision()) {
          this.reset();
          if (!this.lives) {
            this.drawGameOver();
          } else {
            this.ball.reset();
            this.paddle.reset();
          }
        }
      }

      this.ball.move();
      this.paddle.checkKeys();
      requestAnimationFrame(() => this.draw());
    }
  }
}

// const keyDownHandler = (e) => {
//   if (e.key === RIGHT || e.key === ARROW_RIGHT) {
//     paddle.rightPressed = true;
//   } else if (e.key === LEFT || e.key === ARROW_LEFT) {
//     paddle.leftPressed = true;
//   } else if (e.keyCode === 32 && ball.speed === 0) {
//     if (ball.speed === 0) {
//       ball.speed = 3;
//       ball.dx = 1 * ball.speed;
//       ball.dy = -1 * ball.speed;
//       paddle.x = ball.x - ball.radius / 2 + paddle.width / 2;
//     } else if (game.over) {
//       document.location.reload();
//     }
//   }
// };
//
// const keyUpHandler = (e) => {
//   if (e.key === RIGHT || e.key === ARROW_RIGHT) {
//     paddle.rightPressed = false;
//   } else if (e.key === LEFT || e.key === ARROW_LEFT) {
//     paddle.leftPressed = false;
//   }
// };
//
// const mouseMoveHandler = (e) => {
//   const relativeX = e.clientX - canvas.offsetLeft;
//   if (relativeX > 0 && relativeX < canvas.width) {
//     paddle.x = relativeX - paddle.width / 2;
//     if (ball.speed === 0) {
//       ball.x = relativeX;
//     }
//   }
// };
//
// document.addEventListener('keydown', keyDownHandler, false);
// document.addEventListener('keyup', keyUpHandler, false);
// document.addEventListener('mousemove', mouseMoveHandler, false);
// document.addEventListener('click', () => {
//   if (ball.speed === 0) {
//     ball.speed = 3;
//     ball.dx = 1 * ball.speed;
//     ball.dy = -1 * ball.speed;
//   } else if (game.over) {
//     document.location.reload();
//   }
// });

new Game();
