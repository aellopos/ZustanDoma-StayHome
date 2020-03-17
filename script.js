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

let hero = new Image();
hero.src = "filip.png";

canvas.width = width;
canvas.height = height;

function generateBoard() {
    ctx.fillStyle = "white";

    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
            if (board[y][x] === 1) {
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                //ctx.drawImage(hero, x * blockSize, y * blockSize, blockSize, blockSize);
            }
        }
    }
}

function movement() {
    if ((keys[39] || keys[68]) && canMove(player.x + 1, player.y)) {
        // šipka doprava
        player.x++;
    }

    if ((keys[37] || keys[65]) && canMove(player.x - 1, player.y)) {
        // šipka doleva
        player.x--;
    }

    if ((keys[38] || keys[87]) && canMove(player.x, player.y - 1)) {
        // šipka nahoru
        player.y--;
    }

    if ((keys[40]) && canMove(player.x, player.y + 1)) {
        // šipka dolů
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

    ctx.drawImage(hero, player.x * blockSize, player.y * blockSize, blockSize, blockSize);
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;

    draw();
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;

    draw();
});

window.addEventListener("load", draw);