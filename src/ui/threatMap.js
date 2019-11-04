const dx = [0, -1, +1, 0];
const dy = [+1, 0, 0, -1];

export default class ThreatMap {
	constructor (hGame) {
		this.hGame = hGame;
		this.maxGrid = hGame.maxGrid;
		
		this.flagShowThreat = false;
		
		this.threatMap = [];
		for (let x = 1; x <= this.maxGrid.x; x++) {
			this.threatMap[x] = [];
		}
		
		this.thickness = 2;
		this.drawOffsetX = [
			-this.hGame.gridSize / 2 - this.thickness,
			-this.hGame.gridSize / 2 - this.thickness,
			this.hGame.gridSize / 2 - this.thickness,
			-this.hGame.gridSize / 2 - this.thickness
		];
		this.drawOffsetY = [
			this.hGame.gridSize / 2 - this.thickness,
			-this.hGame.gridSize / 2 - this.thickness,
			-this.hGame.gridSize / 2 - this.thickness,
			-this.hGame.gridSize / 2 - this.thickness
		];
		this.drawDX = [
			this.hGame.gridSize + 2*this.thickness,
			2*this.thickness,
			2*this.thickness,
			this.hGame.gridSize + 2*this.thickness,
		];
		this.drawDY = [
			2*this.thickness,
			this.hGame.gridSize + 2*this.thickness,
			this.hGame.gridSize + 2*this.thickness,
			2*this.thickness,
		];
	}
	
	updateThreatMap() {
		for (let x = 1; x <= this.maxGrid.x; x++) {
			for (let y = 1; y <= this.maxGrid.y; y++) {
				this.threatMap[x][y] = false;
			}
		}
		this.hGame.enemyUnitList.forEach(unit => {
			unit.pathData.listAttackable.forEach(obj => {
				this.threatMap[obj.gp.x][obj.gp.y] = true;
			});
		});
	}
	
	toggleThreat() {
		this.flagShowThreat = !this.flagShowThreat;
		//alert(this.flagShowThreat);
	}
	
	checkIfGpInMaxGrid(x, y) {
		if (x < 1 || y < 1 || x > this.maxGrid.x || y > this.maxGrid.y) return false;
		return true;
	}
	
	draw(ctx) {
		if (!this.flagShowThreat) return;
		for (let x = 1; x <= this.maxGrid.x; x++) {
			for (let y = 1; y <= this.maxGrid.y; y++) {
				if (this.threatMap[x][y]) {
					ctx.fillStyle = "rgba(255,50,50,0.1)";
					ctx.fillRect(
						this.hGame.gridPosToPosX(x) - this.hGame.gridSize * 0.5,
						this.hGame.gridPosToPosY(y) - this.hGame.gridSize * 0.5,
						this.hGame.gridSize * 1,
						this.hGame.gridSize * 1
					);
					for (let k = 0; k < 4; k ++) {
						if (! this.checkIfGpInMaxGrid(x + dx[k], y + dy[k])) continue;
						if (! this.threatMap[x + dx[k]][y + dy[k]]) {
							ctx.fillStyle = "rgba(255,50,50,1)";
							ctx.fillRect(
								this.hGame.gridPosToPosX(x) + this.drawOffsetX[k],
								this.hGame.gridPosToPosY(y) + this.drawOffsetY[k],
								this.drawDX[k],
								this.drawDY[k]
							);
						}
					}
				}
			}
		}
	}
}