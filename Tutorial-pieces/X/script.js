let width = 600;
let height = 600;
let blockSize = 30;
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let keys = [];
let pills = [];
let scoreElement = document.getElementById("score");
let score = 0;
//mapa našeho bludiště, 1 = zeď, 0 = cesta
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

// Vytváříme herní objekt pro hráče
let player = {
    // Pozice hráče na ose x a y
    x: 8,
    y: 1
};

let game = {
    scoreElement: document.getElementById("score"),
    score: 0
};

//vytváříme novou proměnnou, do které uložíme obrázek zdi
let wall = new Image();
wall.src = "images/wall.png";

//vytváříme novou proměnnou, do které uložíme obrázek hlavní postavy
let hero = new Image();
hero.src = "images/down.png";

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

//upravujeme výšku a šířku canvasu (naší herní plochy)
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

//funkce, která vygeneruje bludiště
function generateBoard() {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] === 1) {
                ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize);
            }
        }
    }

    for (let i = 0; i < pills.length; i++) {
        ctx.drawImage(pills[i].imageObject, pills[i].x * blockSize, pills[i].y * blockSize, blockSize, blockSize);
    }
}

function startGame() {
    createPills();
    draw();
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

// funkce, která se zaměřuje na sbírání předmětů
function collect() {
    for (let i = 0; i < pills.length; i++) {
        if (player.x == pills[i].x && player.y == pills[i].y) {
            pills.splice(i, 1);

            increaseScore();
        }
    }
}

function increaseScore() {
    score++;

    scoreElement.textContent = `${score}/6`;
}

function canMove(x, y) {
    return (y >= 0 && y < board.length && x >= 0 && x < board[y].length && board[y][x] != 1);
}

function draw() {
    ctx.clearRect(player.x * blockSize, player.y * blockSize, blockSize, blockSize);
    generateBoard();
    movement();
    collect();
    ctx.drawImage(hero,player.x * blockSize, player.y * blockSize, blockSize, blockSize);
}

//poslouchač událostí, čekáme (posloucháme) na načtení stránky, pak zavoláme funkci startGame
window.addEventListener("load", startGame);

// poslouchače událostí pro stisk klávesy
document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;

    draw();
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;

    draw();
});