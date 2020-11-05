class Paddle {
  constructor(canvas) {
    this.color = Colors.grey;
    this.height = 10;
    this.width = 75;
    this.x = (canvas.width - this.width) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
  }

  checkKeys(canvas, ball) {
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

  draw(ctx, canvas) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  collision(ball, checkPowerUp) {
    if (ball.x > this.x && ball.x + ball.radius < this.x + this.width) {
      ball.dy = -ball.dy;
      this.color = ball.color;
      checkPowerUp();
      return true;
    }
    return false;
  }

  reset(canvas) {
    this.x = (canvas.width - this.width) / 2;
  }
}
