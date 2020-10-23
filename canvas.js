/*  global
    alert
*/

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const ballRadius = 10
let x = canvas.width / 2
let y = canvas.height - 30
let ballSpeed = 3
let dx = 1 * ballSpeed
let dy = -1 * ballSpeed
const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false
const brickRowCount = 11
const brickColumnCount = 14
const brickWidth = 75
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30
let score = 0
let lives = 3

const bricks = []
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }
  }
}

const keyDownHandler = e => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true
  }
}

const keyUpHandler = e => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false
  }
}

const mouseMoveHandler = e => {
  const relativeX = e.clientX - canvas.offsetLeft
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2
  }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener('mousemove', mouseMoveHandler, false)

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r]
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy
          b.status = 0
          score++
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!')
            document.location.reload()
          }
        }
      }
    }
  }
}

const drawBall = () => {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#dadada'
  ctx.fill()
  ctx.closePath()
}

const drawPaddle = () => {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = '#dadada'
  ctx.fill()
  ctx.closePath()
}

const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        if (bricks[c][r].y < 50) {
          ctx.fillStyle = '#CC00FF'
        } else if (bricks[c][r].y < 80) {
          ctx.fillStyle = '#8000FF'
        } else if (bricks[c][r].y < 110) {
          ctx.fillStyle = '#0000FF'
        } else if (bricks[c][r].y < 140) {
          ctx.fillStyle = '#0080FF'
        } else if (bricks[c][r].y < 170) {
          ctx.fillStyle = '#00FFFF'
        } else if (bricks[c][r].y < 200) {
          ctx.fillStyle = '#00FF80'
        } else if (bricks[c][r].y < 230) {
          ctx.fillStyle = '#00FF00'
        } else if (bricks[c][r].y < 260) {
          ctx.fillStyle = '#80FF00'
        } else if (bricks[c][r].y < 290) {
          ctx.fillStyle = '#FFFF00'
        } else if (bricks[c][r].y < 320) {
          ctx.fillStyle = '#FF8000'
        } else {
          ctx.fillStyle = '#FF0000'
        }
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

const drawScore = () => {
  ctx.font = '16px Arial'
  ctx.fillStyle = '#dadada'
  ctx.fillText('Score: ' + score, 8, 20)
}

const drawLives = () => {
  ctx.font = '16px Arial'
  ctx.fillStyle = '#dadada'
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20)
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawBall()
  drawPaddle()
  drawScore()
  drawLives()
  collisionDetection()

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
  }
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      if (y = y - paddleHeight) {
        dy = -dy
      }
    } else {
      lives--
      if (!lives) {
        alert('GAME OVER')
        document.location.reload()
      } else {
        x = canvas.width / 2
        y = canvas.height - 30
        dx = 2
        dy = -2
        paddleX = (canvas.width - paddleWidth) / 2
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }

  x += dx
  y += dy
  requestAnimationFrame(draw)
}

draw()
