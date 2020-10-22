const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const ballRadius = 10
let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2
let dy = -2
const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false
const brickRowCount = 3
const brickColumnCount = 5
const brickWidth = 75
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30

const bricks = []
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 }
  }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler (e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true
  }
}

function keyUpHandler (e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false
  }
}

function drawBall () {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}
function drawPaddle () {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}
function drawBricks () {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
      var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
      bricks[c][r].x = brickX
      bricks[c][r].y = brickY
      ctx.beginPath()
      ctx.rect(brickX, brickY, brickWidth, brickHeight)
      ctx.fillStyle = '#0095DD'
      ctx.fill()
      ctx.closePath()
    }
  }
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawBall()
  drawPaddle()

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
  }
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      if (y === y - paddleHeight) {
        dy = -dy
      }
    } else {
      alert('GAME OVER')
      document.location.reload()
      clearInterval(interval) // Needed for Chrome to end game
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }

  x += dx
  y += dy
}

var interval = setInterval(draw, 10)
