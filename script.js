let canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d"),
    blockSize = 30,
    width = 600,
    keys = [],
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
    timeElement: document.getElementById('time'),
    time: 0
};

let hero = new Image();
hero.src = "images/down.png";

let wall = new Image();
wall.src = "images/wall.png";

canvas.width = width;
canvas.height = height;

function generateBoard() {
    ctx.fillStyle = "white";

    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
            if (board[y][x] === 1) {
                ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize);
            }
        }
    }
}

function startGame() {
    game.time = 90;
    showTime();

    draw();
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

    if ((keys[40]) && canMove(player.x, player.y + 1)) {
        // šipka dolů
        hero.src = "images/down.png";
        player.y++;
    }
}

function canMove(x, y) {
    return (y >= 0) && (y < board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}


function draw() {
    ctx.clearRect(player.x * blockSize, player.y * blockSize, blockSize, blockSize);

    generateBoard();
    movement();
    updateTime();

    ctx.drawImage(hero, player.x * blockSize, player.y * blockSize, blockSize, blockSize);
}

function showTime() {
    // nikdy nechceme zobrazit čas menší než 0,
    // pokud čas menší než 0, nastavíme ho na 0
    if (game.time < 0) {
        game.time = 0;
    }

    // z celkového počtu vteřin spočítáme minuty a vteřiny
    let minutes = Math.floor(game.time / 60);
    let seconds = Math.round(game.time - minutes * 60);

    // spočítané minuty a vteřiny převedeme na formát mm:ss
    let formattedTime = ('00' + minutes).slice(-2) + ':' + ('00' + seconds).slice(-2)

    // naformátovaný čas vypíšeme na obrazovku
    game.timeElement.textContent = formattedTime;
}

// provádí pravidelný odpočet času
function updateTime() {
    // odečteme od času 1/50 vteřiny
    game.time = game.time - 1;

    // zobrazíme aktualizovaný čas
    showTime();
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