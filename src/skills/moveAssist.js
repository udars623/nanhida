/* 
	currently only support 1-grid MA
	but extending to 8 dirs shouldn't be too difficult
*/

export default class MoveAssist {
	constructor (hGame) {
		this.hGame = hGame;
		
		this.dUser = [10]; // [2:{x,y}, 4, 6, 8]
		this.dTarget = [10];
		
		for (let i = 0; i <= 9; i ++) {
			this.dUser[i] = null;
			this.dTarget[i] = null;
		}
	}
	
	// super() -> set values to dUser[2] & dTarget[2] -> call this
	copyToFourDirs() {
		this.dUser[8] = {
			x: this.dUser[2].x,
			y: -this.dUser[2].y
		}
		this.dUser[6] = {
			x: this.dUser[2].y,
			y: this.dUser[2].x
		}
		this.dUser[4] = {
			x: -this.dUser[2].y,
			y: this.dUser[2].x
		}
		this.dTarget[8] = {
			x: this.dTarget[2].x,
			y: -this.dTarget[2].y
		}
		this.dTarget[6] = {
			x: this.dTarget[2].y,
			y: this.dTarget[2].x
		}
		this.dTarget[4] = {
			x: -this.dTarget[2].y,
			y: this.dTarget[2].x
		}
	}
	
	getDirection(dest, target) {
		let dx = target.gridPos.x - dest.x;
		let dy = target.gridPos.y - dest.y;
		if (dx > 1 || dx < -1 || dy > 1 || dy < -1) return null;
		return 5 + dx - 3*dy;
	}
	
	checkIfGpInMaxGrid(gp) {
		if (gp.x < 1 || gp.y < 1 || 
			gp.x > this.hGame.maxGrid.x || 
			gp.y > this.hGame.maxGrid.y
		) return false;
		return true;
	}
	
	checkEligibility(user, dest, target) {
		//alert(user.unitID + " @ " + dest.x + "," + dest.y + " -> " + target.unitID);
		let dir = this.getDirection(dest, target);
		if (dir === null) return false;
		if (this.dUser[dir] === null) return false;
		//alert("pass 1");
		let gpNewUser = {
			x: dest.x + this.dUser[dir].x,
			y: dest.y + this.dUser[dir].y
		};
		if (!this.checkIfGpInMaxGrid(gpNewUser)) return false;
		if (!user.checkStopable(gpNewUser, target)) return false;
		//alert("pass 2");
		let gpNewTarget = {
			x: target.gridPos.x + this.dTarget[dir].x,
			y: target.gridPos.y + this.dTarget[dir].y
		};
		if (!this.checkIfGpInMaxGrid(gpNewTarget)) return false;
		if (!target.checkStopable(gpNewTarget, user)) return false;
		//alert("pass 3");
		return true;
	}
	
	execute(user, target) {
		/* 	corrent logic is: 
			UB.eventUseMoveAssist ->
			UB.executeAction -> 
			Game.eventActionExecuted ->
			Game.requirePathUpdate ->
			UB.eventRequirePathUpdate.
			
			To avoid pathData problem, always call in the order of:
			(1) eventMovedByMoveAssist
			(2) eventUseMoveAssist.
		*/
		let dir = this.getDirection(user.destProposalGP, target);
		target.eventMovedByMoveAssist({
			x: target.gridPos.x + this.dTarget[dir].x,
			y: target.gridPos.y + this.dTarget[dir].y
		});
		user.eventUseMoveAssist({
			x: user.destProposalGP.x + this.dUser[dir].x,
			y: user.destProposalGP.y + this.dUser[dir].y
		});
	}
	
}