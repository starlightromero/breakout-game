class Paddle {
  constructor(x, y, width, height, color = 'grey') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
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

  reset(canvas) {
    this.x = (canvas.width - this.width) / 2;
  }
}
