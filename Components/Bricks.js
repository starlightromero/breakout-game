class Bricks {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.bricks = [];
    this.init();
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

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = (c * (brickWidth + brickPadding) + brickOffsetX);
        const brickY = (c * (brickHeight + brickPadding) + brickOffsetY);
        this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, objectColor);
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.columnCount; c += 1) {
      for (let r = 0; r < this.rowCount; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}
