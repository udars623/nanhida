import AbstractController from "./abstractController";

export default class InputHandler {
    constructor(game) {
        this.hGame = game;
        this.hCanvas = game.hCanvas;
        this.abstractController = new AbstractController(game, false);
        this.clickPosQueue = [];

        // https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.isApple = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        let touchEvent = this.isMobile ? "touchstart" : "click";

        this.hCanvas.addEventListener(touchEvent, event => {
            this.mouseClick(this.getMousePosWithinCanvas(event));
            if (this.isMobile) event.preventDefault();
        });

        if (this.isMobile) {
            this.hCanvas.addEventListener("touchmove", event => {
                event.preventDefault();
            });
            this.hCanvas.addEventListener("touchend", event => {
                event.preventDefault();
            });
        }
    }

    getMousePosWithinCanvas(event) {
        // https://stackoverflow.com/questions/9585487/cant-get-coordinates-of-touchevents-in-javascript-on-android-devices
        // holy crap so if it's a TouchEvent then it can capture more than one touch and store them into an array
        // ah yeah so that's probably how multi-touch works. make sense
        if (event.touches !== undefined) event = event.touches[0];

        // https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        let rect = this.hCanvas.getBoundingClientRect();
        return {
            x:
                ((event.clientX - rect.left) / (rect.right - rect.left)) *
                this.hCanvas.width,
            y:
                ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
                this.hCanvas.height
        };
    }

    mouseClick(pos) {
        if (this.hGame.isPhaseBlocked) return;
        if (this.hGame.currentPhase !== this.hGame.PHASE_PLAYER) return;
        this.clickPosQueue.push(pos);
    }

    update(df) {
        while (df > 0 && this.clickPosQueue.length > 0) {
            df--;
			let pos = this.clickPosQueue.shift();
			if (pos.x <= this.hGame.gameWidth && pos.y <= this.hGame.gameHeight) {
				this.abstractController.clickGP(this.hGame.posToGridPos(pos));
			} else {
				this.abstractController.clickButton(this.hGame.findButton(pos));
			}
        }
    }
}
