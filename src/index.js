import InputHandler from "/src/inputHandler";
import Game from "/src/game";
import MapSelecter from "/src/mapSelecter";
import consts from "/src/consts";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 360;
const GAME_HEIGHT = 640;
const DRAW_WIDTH = 430;
const DRAW_HEIGHT = 640;

//let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas);
let playerInputHandler = new InputHandler(game);
game.bindPlayerInputHandler(playerInputHandler);

let mapSelecter = new MapSelecter(game);

game.start("0");

let lastTime = 0;
function gameLoop(timestamp) {
    let dt = timestamp - lastTime;
    lastTime = timestamp;
    let df = dt / 16; // assume 16 ms per frame

    ctx.clearRect(0, 0, DRAW_WIDTH, DRAW_HEIGHT);
    game.update(df);
    game.draw(ctx);

	requestAnimationFrame(gameLoop);
}

function scriptCollapsibles() {
	// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible
	let collapsibles = document.getElementsByClassName("collapsible");
	for (let i = 0; i < collapsibles.length; i++) {
		collapsibles[i].addEventListener("click", function() {
			this.classList.toggle("active");
			let content = this.nextElementSibling; // wtf this is handy
			if (content.style.display === "block") {
				content.style.display = "none";
			} else {
				content.style.display = "block";
			}
		});
	}
}

scriptCollapsibles() ;

requestAnimationFrame(gameLoop);
