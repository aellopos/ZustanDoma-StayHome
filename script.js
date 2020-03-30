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

let game = {
    timeElement: document.getElementById("time"),
    scoreElement: document.getElementById("score"),
    endElement: document.getElementById("end"),
    score: 0,
    time: 0
};

let hero = new Image();
hero.src = "images/down.png";

let wall = new Image();
wall.src = "images/wall.png";

let pill1 = new Image();
pill1.src = "images/pill1.png";

let pill2 = new Image();
pill2.src = "images/pill2.png";

let pill3 = new Image();
pill3.src = "images/pill3.png";

let pill4 = new Image();
pill4.src = "images/pill4.png";

let fruit1 = new Image();
fruit1.src = "images/fruit1.png";

let fruit2 = new Image();
fruit2.src = "images/fruit2.png";

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
    game.time = 10;
    createPills();
    draw();
    timer(game.time);
}

function endGame(type) {
    if (type === "win") {
        game.endElement.style.display = "visible";
    }

    if (type === "loss") {
        game.endElement.style.display = "visible";
    }
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

            if (timer-- < 0) {
                endGame("loss");
            }
        }, 1000);
    }
    display = document.querySelector("#time");
    startTimer(time, display);
}

function movement() {
    if (keys[39] && canMove(player.x + 1, player.y)) {
        // šipka doprava
        hero.src = "images/right.png";
        player.x++;
    }

    if (keys[37] && canMove(player.x - 1, player.y)) {
        // šipka doleva
        hero.src = "images/left.png";
        player.x--;
    }

    if (keys[38] && canMove(player.x, player.y - 1)) {
        // šipka nahoru
        hero.src = "images/up.png";
        player.y--;
    }

    if (keys[40] && canMove(player.x, player.y + 1)) {
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
    ctx.clearRect(
        player.x * blockSize,
        player.y * blockSize,
        blockSize,
        blockSize
    );

    generateBoard();
    movement();
    collect();

    if (game.score === 6) {
        endGame("win");
    }

    ctx.drawImage(
        hero,
        player.x * blockSize,
        player.y * blockSize,
        blockSize,
        blockSize
    );
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