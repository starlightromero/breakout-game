/*  global
    alert, requestAnimationFrame
*/

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const ballRadius = 10
let ballColor = '#dadada'
let ballSpeed = 0
let dx = 1 * ballSpeed
let dy = -1 * ballSpeed
let paddleColor = '#dadada'
const paddleHeight = 10
let paddleWidth = 75
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
let x = canvas.width / 2
let y = canvas.height - paddleHeight - ballRadius
let score = 0
let lives = 3
let gameOver = false

const bricks = []
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1, color: '#dadada' }
  }
}

const keyDownHandler = e => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true
  } else if (e.keyCode === 32 && ballSpeed === 0) {
    if (ballSpeed === 0) {
      ballSpeed = 3
      dx = 1 * ballSpeed
      dy = -1 * ballSpeed
      paddleX = x - ballRadius / 2 + paddleWidth / 2
    } else if (gameOver) {
      document.location.reload()
    }
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
    if (ballSpeed === 0) {
      x = relativeX
    }
  }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener('mousemove', mouseMoveHandler, false)
document.addEventListener('click', () => {
  if (ballSpeed === 0) {
    ballSpeed = 3
    dx = 1 * ballSpeed
    dy = -1 * ballSpeed
  } else if (gameOver) {
    document.location.reload()
  }
})

const resetGame = () => {
  ballColor = '#dadada'
  paddleColor = '#dadada'
  ballSpeed = 3
  dx = 1 * ballSpeed
  dy = -1 * ballSpeed
}

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r]
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight + ballRadius) {
          dy = -dy
          b.status = 0
          ballColor = b.color
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
  ctx.fillStyle = ballColor
  ctx.fill()
  ctx.closePath()
}

const drawPaddle = () => {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = paddleColor
  ctx.fill()
  ctx.closePath()
}

const colorBricks = r => {
  switch (r) {
    case 0:
      return '#CC00FF'
    case 1:
      return '#8000FF'
    case 2:
      return '#0000FF'
    case 3:
      return '#0080FF'
    case 4:
      return '#00FFFF'
    case 5:
      return '#00FF80'
    case 6:
      return '#00FF00'
    case 7:
      return '#80FF00'
    case 8:
      return '#FFFF00'
    case 9:
      return '#FF8000'
    case 10:
      return '#FF0000'
  }
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
        bricks[c][r].color = colorBricks(r)
        ctx.fillStyle = bricks[c][r].color
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

const checkPowerUp = () => {
  switch (paddleColor) {
    case '#CC00FF':
      ballSpeed++
      break
    case '#8000FF':
      ballSpeed++
      break
    case '#0000FF':
      ballSpeed--
      break
    case '#0080FF':
      paddleWidth += 20
      break
    case '#00FFFF':
      paddleWidth -= 10
      break
    case '#00FF80':
      paddleWidth += 10
      break
    case '#00FF00':
      paddleWidth -= 5
      break
    case '#80FF00':
      paddleWidth += 5
      break
    case '#FFFF00':
      ballSpeed--
      break
    case '#FF8000':
      paddleWidth += 5
      break
    case '#FF0000':
      ballSpeed++
      break
  }
  console.log(ballSpeed)
  if (dx > 0) {
    dx = 1 * ballSpeed
  } else {
    dx = -1 * ballSpeed
  }
  if (dy < 0) {
    dy = -1 * ballSpeed
  } else {
    dy = 1 * ballSpeed
  }
}

const draw = () => {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks()
    drawBall()
    drawPaddle()
    drawScore()
    drawLives()
    collisionDetection()

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      // ball hits wall
      dx = -dx
      ballColor = '#dadada'
    }
    if (y + dy < ballRadius) {
      // ball hits top
      dy = -dy
    } else if (y + ballRadius >= canvas.height - paddleHeight && ballSpeed > 0) {
      if (x > paddleX && x + ballRadius < paddleX + paddleWidth) {
        // ball hits paddle
        dy = -dy
        paddleColor = ballColor
        checkPowerUp()
      } else {
        lives--
        resetGame()
        // ballSpeed = 0
        if (!lives) {
          ctx.beginPath()
          ctx.font = '130px Helvetica'
          ctx.fillStyle = '#dadada'
          const gameoverString = 'GAMEOVER'
          const gameoverWidth = ctx.measureText(gameoverString).width
          ctx.fillText(gameoverString, canvas.width / 2 - gameoverWidth / 2, canvas.height / 2)
          gameOver = true
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
      if (ballSpeed === 0) {
        x += 7
      }
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7
      if (ballSpeed === 0) {
        x -= 7
      }
    }

    x += dx
    y += dy
    requestAnimationFrame(draw)
  }
}

draw()
