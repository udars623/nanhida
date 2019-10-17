export default class effectStartPhase {
    constructor(hGame, isEnemyPhase) {
        this.frame = 1;
        this.maxFrame = 100;
        this.isEnemyPhase = isEnemyPhase;
        if (isEnemyPhase) this.image = document.getElementById("img_effect_EP");
        else this.image = document.getElementById("img_effect_PP");
        this.drawX = hGame.gameWidth + hGame.gridSize + 20;
        this.drawY =
            (hGame.gridSize * hGame.maxGrid.y) / 2 - this.image.height / 2;
        this.hGame = hGame;
    }

    update(df) {
        this.frame += df;
        this.drawX -= 22 * df;
        if (this.frame > this.maxFrame) this.hGame.eventEffectEnd(this);
    }

    draw(ctx) {
        if (this.frame <= this.maxFrame)
            ctx.drawImage(this.image, this.drawX, this.drawY);
    }
}
