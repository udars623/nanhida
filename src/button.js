let BUTTON_OFFSET_X = 10;

/*
	How to add button:
	Usually, you don't need to change this file.
	(1) Add the button in Game.makeButtons().
	(2) Add consts.buttons entry.
	(3) Add button trigger in AbsCon.clickButton().
	(4) Implement the functionality of button in Game, UnitBase, etc.
*/

export default class Button {
	constructor (hGame, imgString, id, drawGP) {
		this.hGame = hGame;
		this.img = document.getElementById(imgString);
		
		this.buttonID = id;
		this.drawGP = drawGP;
		
		this.pos = this.hGame.gridPosToPos(drawGP);
		//alert(this.pos.x + ", " +this.pos.y);
		
		this.drawScale = 1;
		this.drawScaleMax = 1;
		
	}
	
	checkClick(pos) {
		if (pos.x >= BUTTON_OFFSET_X + this.pos.x - this.hGame.gridSize * this.drawScale * 0.5
			&& pos.y >= this.pos.y - this.hGame.gridSize * this.drawScale * 0.5
			&& pos.x <= BUTTON_OFFSET_X + this.pos.x + this.hGame.gridSize * this.drawScale * 0.5
			&& pos.y <= this.pos.y + this.hGame.gridSize * this.drawScale * 0.5
		)	return true;
		return false;
	}
	
	eventClick() {
		this.drawScale = 0.7;
	}
	
	update(df) {
		if (this.drawScale < this.drawScaleMax)
			this.drawScale = Math.min(this.drawScale + df * 0.02, this.drawScaleMax);
	}
	
	draw(ctx) {
		ctx.drawImage(
			this.img, 
			BUTTON_OFFSET_X + this.pos.x - this.hGame.gridSize * this.drawScale * 0.5, 
			this.pos.y - this.hGame.gridSize * this.drawScale * 0.5, 
			this.hGame.gridSize*this.drawScale,
			this.hGame.gridSize*this.drawScale
		);
	}
}