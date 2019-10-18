export default class effectGameOver {
    constructor(hGame) {
        this.frame = 1;
        this.maxFrame = 300;
		this.image = document.getElementById("img_effect_GameOver");
        this.drawX = document.getElementById("gameScreen").width / 2 - this.image.width / 2;
        this.drawY = hGame.gameHeight;
        this.hGame = hGame;
    }

    update(df) {
        this.frame += df;
        this.drawY -= (2*this.hGame.gameHeight / this.maxFrame) * df;
        if (this.frame > this.maxFrame) this.hGame.eventEffectEnd(this);
    }

    draw(ctx) {
        if (this.frame <= this.maxFrame)
            ctx.drawImage(this.image, this.drawX, this.drawY);
    }
}
