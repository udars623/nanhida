export default class effectStageClear {
    constructor(hGame) {
        this.frame = 1;
        this.maxFrame = 200;
		this.hCanvas = document.getElementById("gameScreen");
		this.image = document.getElementById("img_effect_stageClear");
        this.drawX = this.hCanvas.width / 2;
        this.drawY = this.hCanvas.height / 2;
		this.drawScale = 0.05;
		this.drawAngle = 0;
		this.phase = 0;
		this.phaseLength = [50, 180, this.maxFrame];
        this.hGame = hGame;
    }

    update(df) {
        this.frame += df;
        if (this.frame > this.maxFrame) this.hGame.eventEffectEnd(this);
		if (this.frame >= this.phaseLength[this.phase]) {
			this.phase ++;
			if (this.phase === 1) {
				this.drawScale = 1;
				this.drawAngle = 0;
			}
		}
        if (this.phase === 0) {
			this.drawScale += (1 - 0.05) / this.phaseLength[0] * df;
			this.drawAngle += 2 * Math.PI * 5 / this.phaseLength[0] * df;
		}
		if (this.phase === 2) {
			this.drawScale -= df / (this.phaseLength[2] - this.phaseLength[1]);
		}

    }

    draw(ctx) {
        if (this.frame <= this.maxFrame) {
			let trX = this.hCanvas.width/2, trY = this.hCanvas.height/2;
			ctx.translate(trX, trY);
			ctx.rotate(this.drawAngle);
			ctx.translate(-trX, -trY);
            ctx.drawImage(
				this.image, 
				this.drawX - this.image.width * this.drawScale / 2, 
				this.drawY - this.image.height * this.drawScale / 2, 
				this.image.width * this.drawScale,
				this.image.height * this.drawScale,
			);
			ctx.translate(trX, trY);
			ctx.rotate(-this.drawAngle);
			ctx.translate(-trX, -trY);
		}
    }
}
