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
    this.ball = new Ball(0, 0, 2, -2 ballRadius, objectColor);
    this.paddle = new Paddle(canvas);
    this.bricks = new Bricks();
    this.scoreLabel = new GameLabel('Score: ', 8, 20)
    this.livesLabel = new GameLabel('Lives: ', canvas.width - 65, 20)

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup()
    this.draw()
  }

  setup() {
    this.livesLabel.value = 3
    this.resetBallAndPaddle()

    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
    document.addEventListener('click', () => {
      if (ball.speed === 0) {
        ball.speed = 3;
        ball.dx = 1 * ball.speed;
        ball.dy = -1 * ball.speed;
      } else if (game.over) {
        document.location.reload();
      }
    });
  }

  resetBallAndPaddle() {
    this.ball.color = Colors.grey;
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height - 30;
    this.ball.speed = 3;
    this.ball.dx = 1 * this.ball.speed;
    this.ball.dy = -1 * this.ball.speed;
    this.paddle.color = Colors.grey;
    this.paddle.x = paddleXStart;
  }

  collisionBricks() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.brick[c][r];
        if (brick.status === 1) {
          if (
            this.ball.x > brick.x
            && this.ball.x < brick.x + brick.width
            && this.ball.y > brick.y
            && this.ball.y < brick.y + brick.height + this.ball.radius
          ) {
            this.ball.dy = -this.ball.dy;
            this.ball.color = brick.color;
            brick.status = 0;
            this.scoreLabel.value += 1;
            this.checkIfWon();
          }
        }
      }
    }
  }

  checkIfWon() {
    if (this.score === this.bricks.rowCount * this.bricks.columnCount) {
      this.displayYouWin();
      document.location.reload();
    }
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

  movePaddle() {
    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0)
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0)
    }
  }

  displayGameOver() {
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

  collisionBottomAndPaddle() {
    if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        // Hit paddle
        this.ball.dy = -this.ball.dy
        this.paddle.color = this.ball.color
        this.checkPowerUp()
      } else {
        // Loose a life
        this.livesLabel.value -= 1
        if (this.livesLabel.value < 1) {
          // Game Over
          this.displayGameOver()
          this.resetBallAndPaddle()
        } else {
          this.resetBallAndPaddle()
        }
      }
    }
  }

  collisionWithCanvasAndPaddle() {
    this.collisionWall()
    this.collisionTop()
    this.collisionBottomAndPaddle()
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

  keyDownHandler(e) {
    if (e.key === RIGHT || e.key === ARROW_RIGHT) {
      this.rightPressed = true;
    } else if (e.key === LEFT || e.key === ARROW_LEFT) {
      this.leftPressed = true;
    } else if (e.keyCode === 32 && this.ball.speed === 0) {
      if (this.ball.speed === 0) {
        this.ball.speed = 3;
        this.ball.dx = 1 * this.ball.speed;
        this.all.dy = -1 * this.ball.speed;
        this.paddle.x = this.ball.x - this.ball.radius / 2 + this.paddle.width / 2;
      } else if (this.over) {
        document.location.reload();
      }
    }
  };

  keyUpHandler(e) {
    if (e.key === RIGHT || e.key === ARROW_RIGHT) {
      this.rightPressed = false;
    } else if (e.key === LEFT || e.key === ARROW_LEFT) {
      this.leftPressed = false;
    }
  };

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, paddleYStart)
      if (this.ball.speed === 0) {
        this.ball.x = relativeX;
      }
    }
  };

  draw() {
    if (!this.over) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.bricks.render(ctx);
      this.ball.render(ctx);
      this.paddle.render(ctx);
      this.scoreLabel.render(ctx);
      this.livesLabel.render(ctx);
      this.collisionBricks()
      this.ball.move()
      this.movePaddle()
      this.collisionWithCanvasAndPaddle()
      requestAnimationFrame(() => this.draw());
    }
  }
}

new Game();
