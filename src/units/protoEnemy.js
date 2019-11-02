import UnitBase from "/src/unitBase";
import consts from "/src/consts";

/*
	params: {
		moveAssist
		skills: []
		barrier: [unitIDs].  Note: unitID starts from 1!!!! WTF!!!!
	}
*/

export default class ProtoEnemy extends UnitBase {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy);
		//this.params = params;
		this.params = JSON.parse(JSON.stringify(params));
		if (this.params.skills === undefined) this.params.skills = [];
		this.barrierTimer = this.hGame.barrierConnectionTimer;
		//this.initBarrier();   <-- moved to update()
	}
	
	initBarrier() {
		this.barrierTotal = 0;
		this.barrierSourceList = [];
		if (this.params.barrier === undefined) this.params.barrier = null;
		if (this.params.barrier !== null) {
			this.params.barrier.forEach(id => {
				this.barrierTotal ++;
				this.barrierSourceList.push(
					this.hGame.findUnitByID(this.isEnemy, id)
				);
			});
		}
		
		if (this.barrierTotal > 0) this.imageZokusei = this.imageBarrier;
	}
	
	initAfterCreation() {
		super.initAfterCreation();
		let zokuStr = "img_effect_barrier_grey";
		if (this.params !== null && this.params.zokusei !== undefined) {
			if (this.params.zokusei === consts.zokusei.red) zokuStr = "img_effect_barrier_red";
			if (this.params.zokusei === consts.zokusei.blue) zokuStr = "img_effect_barrier_blue";
			if (this.params.zokusei === consts.zokusei.green) zokuStr = "img_effect_barrier_green";
		}
		this.imageBarrier = document.getElementById(zokuStr);
		this.imageZokuseiReal = this.imageZokusei;
		
	}
	
	eventLoseBarrier(unitSource) {
		let idx = this.params.barrier.indexOf(unitSource.unitID);
		if (idx === -1) return;
		
		/*
		let idx = this.params.barrier.indexOf(unitSource.unitID);
		if (idx !== -1) {
			let len = this.params.barrier.length;
			if (idx !== len-1) {
				this.params.barrier[idx] = this.params.barrier.pop();
			} else {
				this.params.barrier.pop();
			}
		}*/
		this.barrierTotal --;
		removeObjectFromList(unitSource, this.barrierSourceList);
		if (this.barrierTotal <= 0) {
			this.imageZokusei = this.imageZokuseiReal;
		}
	}
	
	eventLoseHP(damage) {
		if (this.barrierTotal > 0) return;
		super.eventLoseHP(damage);
	}
	
	update(df) {
		super.update(df);
		
		// this is ugly but it should avoid barrier-lock problems
		if (this.barrierTotal === undefined) this.initBarrier();
	}
	
	drawBarrierConnection(ctx) {
		if (this.barrierTotal <= 0) return;
		if (this.isInPhase()) return;
		if (this.hGame.flagDrawAllBarrier === false &&
			this.isSelected === false) return;
		if (this.hGame.flagDrawAllBarrier && 
			this.hGame.flagUnitSelected &&
			this.isSelected === false) return;
		
		if (this.barrierTimer.timer > 2) return;
		
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#0000FF";
		let	x2 = this.hGame.gridPosToPosX(this.gridPos.x), 
			y2 = this.hGame.gridPosToPosY(this.gridPos.y);
			
		this.barrierSourceList.forEach(unit => {
			let x1 = this.hGame.gridPosToPosX(unit.gridPos.x), 
				y1 = this.hGame.gridPosToPosY(unit.gridPos.y);
			
			if (this.barrierTimer.timer <= 1) {
				drawLine(
					ctx, x1, y1, 
					x1 + this.barrierTimer.timer * (x2 - x1), 
					y1 + this.barrierTimer.timer * (y2 - y1)
				);
			} else {
				drawLine(
					ctx, 
					x1 + (this.barrierTimer.timer-1) * (x2 - x1), 
					y1 + (this.barrierTimer.timer-1) * (y2 - y1), 
					x2, y2
				);
			}
			//drawLine(ctx, x1, y1, x2, y2);
		});
	}
	
	/*
	drawUnit(ctx) {
		if (this.barrierTotal > 0) this.drawBarrierConnection(ctx);
		super.drawUnit(ctx);
	}
	*/
	
}

function drawLine(ctx, x1, y1, x2, y2) {
	//alert(ctx +","+ x1 +","+ y1 +","+ x2 +","+ y2);
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function removeObjectFromList(object, list) {
    let idx = list.indexOf(object);
    list.splice(idx, 1);
}
