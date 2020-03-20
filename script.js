let canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext("2d"),
  blockSize = 30,
  width = 600,
  keys = [],
  pills = [],
  height = 600;

let board = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let player = {
  x: 8,
  y: 1
};
let villain = {
  x: 12,
  y: 18
};

let game = {
  timeElement: document.getElementById("time"),
  scoreElement: document.getElementById("score"),
  score: 0,
  time: 0
};

let hero = new Image();
hero.src = "images/player/doc_3.0_right.png";

let wall = new Image();
wall.src = "images/wall.png";

let pill1 = new Image();
pill1.src = "images/collectibles/paper.png";

let pill2 = new Image();
pill2.src = "images/collectibles/lotion.png";

let pill3 = new Image();
pill3.src = "images/collectibles/face_mask.png";

let pill4 = new Image();
pill4.src = "images/collectibles/pill4.png";

let fruit1 = new Image();
fruit1.src = "images/collectibles/fruit1.png";

let fruit2 = new Image();
fruit2.src = "images/collectibles/fruit2.png";

let enemy = new Image();
enemy.src = "images/player/enemy-left.png";

let preloadPlayer = new Image();
preloadPlayer.src = "images/player/doc_3.0_right.png";

canvas.width = width;
canvas.height = height;

function createPills() {
  pills.push({
    x: 1,
    y: 1,
    imageObject: pill1
  });

  pills.push({
    x: 1,
    y: 15,
    imageObject: pill2
  });

  pills.push({
    x: 14,
    y: 12,
    imageObject: pill3
  });

  pills.push({
    x: 15,
    y: 18,
    imageObject: pill4
  });

  pills.push({
    x: 5,
    y: 11,
    imageObject: fruit1
  });

  pills.push({
    x: 18,
    y: 5,
    imageObject: fruit2
  });
}

function generateBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) {
        ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }

  for (let i = 0; i < pills.length; i++) {
    ctx.drawImage(
      pills[i].imageObject,
      pills[i].x * blockSize,
      pills[i].y * blockSize,
      blockSize,
      blockSize
    );
  }
}

function startGame() {
  game.time = 90;
  var audio = new Audio("music/CoronaGameMix.wav");
  audio.play();
  createPills();
  draw();
  timer(game.time);
  moveEnemy();

}
// provádí pravidelný odpočet času
function timer(time) {
  function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.innerText = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = 0;
      }
    }, 1000);
  }
  display = document.querySelector("#time");
  startTimer(time - 1, display);
}

function movement() {
  if ((keys[39] || keys[68]) && canMove(player.x + 1, player.y)) {
    // šipka doprava
    hero.src = "images/player/doc_3.0_right.png";
    player.x++;
  }

  if ((keys[37] || keys[65]) && canMove(player.x - 1, player.y)) {
    // šipka doleva
    hero.src = "images/player/doc_3.0._left.png";
    player.x--;
  }

  if ((keys[38] || keys[87]) && canMove(player.x, player.y - 1)) {
    // šipka nahoru
    player.y--;
  }

  if (keys[40] && canMove(player.x, player.y + 1)) {
    // šipka dolů
    player.y++;
  }
}

function canMove(x, y) {
  return (
    y >= 0 &&
    y < board.length &&
    x >= 0 &&
    x < board[y].length &&
    board[y][x] != 1
  );
}

function draw() {
  ctx.clearRect(
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize
  );

  generateBoard();
  movement();
  collect();

  ctx.drawImage(
    hero,
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize
  );

}
function moveEnemy() {
  let xrandom = Math.floor(Math.random() * 19 + 1);
  let yrandom = Math.floor(Math.random() * 19 + 1);
  console.log("enemy spawning at " + xrandom + " & " + yrandom);
  if (canMove(xrandom, yrandom)) {
    ctx.drawImage(
      enemy,
      xrandom * blockSize,
      yrandom * blockSize,
      blockSize,
      blockSize
    );
  } else {
    moveEnemy();
  }
}

function collect() {
  for (let i = 0; i < pills.length; i++) {
    if (player.x == pills[i].x && player.y == pills[i].y) {
      pills.splice(i, 1);
      increaseScore();
    }
  }
}

function increaseScore() {
  game.score++;

  game.scoreElement.textContent = `${game.score}/6`;
}

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;

  draw();
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;

  draw();
});

window.addEventListener("load", startGame);
