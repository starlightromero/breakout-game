class Ball {
  constructor(canvas, paddle) {
    this.radius = 10;
    this.color = '#dadada';
    this.speed = 0;
    this.dx = 1 * this.speed;
    this.dy = -1 * this.speed;
    this.x = canvas.width / 2;
    this.y = canvas.height - paddle.height - this.radius;
  }

  draw(ctx) {
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

  reset(canvas) {
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.dx = 2;
    this.dy = -2;
  }
}
