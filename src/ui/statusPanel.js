import texts from "/src/texts/texts_jp"

const sx = [2.3, 2.3, 2.3, 4.3, 4.3, 4.3];
const sy = [1.1, 1.4, 1.7, 1.1, 1.4, 1.7];

export default class StatusPanel {
	constructor (hGame) {
		this.hGame = hGame;
		
		this.currentUnit = null;
		
		this.skillCounter = 0;
	}
	
	eventSelectUnit (unit) {
		//alert("select");
		this.currentUnit = unit;
	}
	
	eventDeselect () {
		this.currentUnit = null;
	}
	
	drawSkillText(ctx, str) {
		ctx.fillText(
			str,
			this.hGame.gridSize * sx[this.skillCounter],
			this.hGame.gridSize * (this.hGame.maxGrid.y + sy[this.skillCounter])
		);
		this.skillCounter ++;
	}
	
	draw(ctx) {
		if (this.currentUnit !== null) {
			//alert("draw");
			ctx.drawImage(
                this.currentUnit.image,
                0,
                this.hGame.gridSize * (this.hGame.maxGrid.y+0.2),
                this.hGame.gridSize*2,
                this.hGame.gridSize*2
            );
			ctx.fillStyle = "#000";
			ctx.font = "18px serif";
			ctx.fillText(
				this.currentUnit.nameStrDisp,
				this.hGame.gridSize * 2.3,
				this.hGame.gridSize * (this.hGame.maxGrid.y+0.6)
			);
			
			this.skillCounter = 0;
			let cUP = this.currentUnit.params;
			if (this.currentUnit.params !== null) {
				ctx.font = "14px serif";
				if (cUP.moveAssist !== undefined) {
					this.drawSkillText(ctx,
						this.hGame.moveAssistList.names[cUP.moveAssist]
					);
				}
				if (cUP.skills !== undefined) {
					cUP.skills.forEach(skillLvPair => {
						this.drawSkillText(ctx, 
							texts.skills[skillLvPair.skill]+skillLvPair.level
						);
					});
				}
			}
		}
	}
}