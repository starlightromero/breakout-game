class GameLabel extends Sprite {
  constructor(text, x, y, color, font = '16px Arial') {
    super(x, y, 0, 0, color);
    this.text = text;
    this.font = font;
    this.value = 0;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}
