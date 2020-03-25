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
    endElement: document.getElementById("end"),
    endMessage: document.getElementById("message"),
    score: 0,
    time: 0
};

game.endElement.style.display = "none";

let hero = new Image();
hero.src = "images/player/doc_3.0_right.png";

let wall = new Image();
wall.src = "images/wall.png";

let collectibles_images = [];

collectibles_images[0] = new Image();
collectibles_images[0].src = "images/collectibles/paper.png";

collectibles_images[1] = new Image();
collectibles_images[1].src = "images/collectibles/lotion.png";

collectibles_images[2] = new Image();
collectibles_images[2].src = "images/collectibles/face_mask.png";

collectibles_images[3]= new Image();
collectibles_images[3].src = "images/collectibles/pill4.png";

let enemy = new Image();
enemy.src = "images/player/enemy-left.png";

let preloadPlayer = new Image();
preloadPlayer.src = "images/player/doc_3.0_right.png";

canvas.width = width;
canvas.height = height;

function createPills() {
  console.log("pushing")

  for (var i = 0; i < collectibles_images.length; i++) {
    console.log(i);
    function SpawnPill() {
    const randomX = Math.floor((Math.random())*20)
    const randomY = Math.floor((Math.random())*20)
    if (canMove(randomX, randomY)) {
    pills.push({
      x: randomX,
      y: randomY,
      imageObject: collectibles_images[i]
    });
   } else {
     SpawnPill();
   }
  }
  SpawnPill();
  }
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

function checkCollision() {
  if(villain.x == player.x && villain.y == player.y) {
    console.assert("Collided!");
  }
}

function endGame(type, timeTaken) {
    if (type === "win") {
        game.endElement.style.display = "block";
        game.endMessage.innerText = `Vyhráli jste! Sesbírali jste všech 6 vitamínů za ${time}`;
    }

    if (type === "loss") {
        game.endElement.style.display = "block";
    }
}
// provádí pravidelný odpočet času
function timer(time) {
    function startTimer(duration, display) {
        var timer = duration,
            minutes,
            seconds;
        const CountDownInterval = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.innerText = minutes + ":" + seconds;
            game.time = timer;
            if (timer-- == 0) {
                clearInterval(CountDownInterval);
                endGame("loss");
            }
        }, 1000);
    }
    display = document.querySelector("#time");
    startTimer(time, display);
}

function movement() {
    if ((keys[39] || keys[68]) && canMove(player.x + 1, player.y)) {
        // šipka doprava
        hero.src = "images/right.png";
        player.x++;
    }

    if ((keys[37] || keys[65]) && canMove(player.x - 1, player.y)) {
        // šipka doleva
        hero.src = "images/left.png";
        player.x--;
    }

    if ((keys[38] || keys[87]) && canMove(player.x, player.y - 1)) {
        // šipka nahoru
        hero.src = "images/up.png";
        player.y--;
    }

    if ((keys[40] || keys[83]) && canMove(player.x, player.y + 1)) {
        // šipka dolů
        hero.src = "images/down.png";
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

  checkCollision();

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
    villain.x = xrandom;
    villain.y = yrandom;
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

  game.scoreElement.textContent = `${game.score}/${collectibles_images.length}`;
}

document.body.addEventListener("keydown", function(e) {
    console.log("drawing");

    if(game.endElement.style.display == "none") {
        keys[e.keyCode] = true;
        draw();
    }
});

document.body.addEventListener("keyup", function(e) {
    console.log("drawing");
    if(game.endElement.style.display == "none"){
        keys[e.keyCode] = false;
        draw();
    } 
});

window.addEventListener("load", startGame);