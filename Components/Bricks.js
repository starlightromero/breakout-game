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
    this.show();
  }

  color(r) {
    switch (r) {
      case 0:
        return Colors.violet;
      case 1:
        return Colors.purple;
      case 2:
        return Colors.blue;
      case 3:
        return Colors.lightBlue;
      case 4:
        return Colors.skyBlue;
      case 5:
        return Colors.blueGreen;
      case 6:
        return Colors.green;
      case 7:
        return Colors.limeGreen;
      case 8:
        return Colors.yellow;
      case 9:
        return Colors.orange;
      case 10:
        return Colors.red;
      default:
        return Colors.red;
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

  collision(ball, game) {
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

  draw(ctx) {
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

export default Bricks;
