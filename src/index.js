import InputHandler from "/src/inputHandler";
import Game from "/src/game";
import consts from "/src/consts";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 360;
const GAME_HEIGHT = 640;

//let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas);
let playerInputHandler = new InputHandler(game);
game.bindPlayerInputHandler(playerInputHandler);

game.start();

let lastTime = 0;
function gameLoop(timestamp) {
    let dt = timestamp - lastTime;
    lastTime = timestamp;
    let df = dt / 16; // assume 16 ms per frame

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(df);
    game.draw(ctx);

    if (game.gameResult === consts.gameResult.None) {
        requestAnimationFrame(gameLoop);
    } else if (game.gameResult === consts.gameResult.Win) alert("You win!");
    else if (game.gameResult === consts.gameResult.Lose) alert("GAME OVER");
}

requestAnimationFrame(gameLoop);
