class Sprite {
  constructor(x, y, color = 'grey') {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  render(ctx, a, b) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, a, b);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Sprite;
