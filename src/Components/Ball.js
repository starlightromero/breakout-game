import Colors from './Colors';
import Sprite from './Sprite';

class Ball extends Sprite {
  constructor(x = 0, y = 0, speed = 1, radius = 10, color = Colors.grey) {
    super(x, y, radius * 2, radius * 2, color);
    this.speed = speed;
    this.dx = this.speed;
    this.dy = -this.speed;
    this.radius = radius;
    this.PI2 = Math.PI * 2;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, this.PI2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  updateSpeed(speed) {
    this.speed = speed;
    this.dx = Math.sign(this.dx) * this.speed;
    this.dy = Math.sign(this.dy) * this.speed;
  }

  move() {
    this.moveBy(this.dx, this.dy);
  }
}

export default Ball;
