import AbstractController from "/src/abstractController";
import consts from "/src/consts";

// remember to check 1~maxGrid when using this stuff
let dAtk = [];
dAtk[0] = [];
dAtk[1] = [{x:0, y:+1}, {x:-1, y:0}, {x:+1, y:0}, {x:0, y:-1} ];
dAtk[2] = [{x:0, y:+2}, {x:-1, y:+1}, {x:+1, y:+1}, {x:-2, y:0},
			{x:+2, y:0}, {x:-1, y:-1}, {x:+1, y:-1}, {x:0, y:-2}];
const MAX_DIST = 100000-1;

let zoku = consts.zokusei;

export default class EnemyAI {
    constructor(hGame, isEnemy) {
        this.hGame = hGame;
		this.maxGrid = this.hGame.maxGrid;
		
        this.isEnemy = isEnemy;
        if (this.isEnemy) {
            this.suList = hGame.enemyUnitList;
            this.ouList = hGame.playerUnitList;
        } else {
            this.suList = hGame.playerUnitList;
            this.ouList = hGame.enemyUnitList;
        }

        this.absCon = new AbstractController(this.hGame, isEnemy);
		
		this.suPDIR = null; // path data with inf search range
		this.ouPDIR = null;

        this.blockFrameRemain = 0;
        this.blockFramePerAttack = 18;
        this.blockFramePerMove = 18;
        this.blockFramePerWait = 10;
    }

    executeWait(unit) {
        this.absCon.clickGP(unit.gridPos);
        this.absCon.clickButton(consts.buttons.Wait);
		this.absCon.clickButton(consts.buttons.Wait);
        this.blockFrameRemain = this.blockFramePerWait;
    }

    executeMove(unit, dest) {
		if (dest.x === unit.gridPos.x && dest.y === unit.gridPos.y) {
			this.executeWait(unit);
			return;
		}
        this.absCon.clickGP(unit.gridPos);
        this.absCon.clickGP(dest);
        this.absCon.clickGP(dest);
        this.blockFrameRemain = this.blockFramePerMove;
    }

    executeMoveAttack(unit, dest, target) {
        //alert(unit.gridPos.x + ", " + unit.gridPos.y + " @ " + dest.x + ", " + dest.y + " vs "+ target.gridPos.x + ", " + target.gridPos.y);
        this.absCon.clickGP(unit.gridPos);
        if (dest.x === unit.gridPos.x && dest.y === unit.gridPos.y) {
            this.absCon.clickGP(target.gridPos);
            this.absCon.clickGP(target.gridPos);
        } else {
            this.absCon.clickGP(dest);
            this.absCon.clickGP(target.gridPos);
            this.absCon.clickGP(target.gridPos);
        }
        this.blockFrameRemain = this.blockFramePerAttack;
    }
	
	checkIfGpInMaxGrid(x, y) {
		if (x < 1 || y < 1 || x > this.maxGrid.x || y > this.maxGrid.y) return false;
		return true;
	}

	findBestAttackPosition(su, target) {
		let dAttacks = dAtk[su.attackRange];
		
		let minDist = MAX_DIST;
		let bestGP = null;
		dAttacks.forEach(dgp => {
			if (this.checkIfGpInMaxGrid(target.gridPos.x + dgp.x, target.gridPos.y + dgp.y) &&
				su.pathData.dist[target.gridPos.x + dgp.x][target.gridPos.y + dgp.y] < minDist
			) {
				let newGP = {x : target.gridPos.x+dgp.x,  y : target.gridPos.y+dgp.y};
				let unit = this.hGame.findUnitByGridPos(newGP);
				if (unit === null || unit.unitID === su.unitID) {
					minDist = su.pathData.dist[target.gridPos.x + dgp.x][target.gridPos.y + dgp.y];
					bestGP = newGP;
				}
			}
		});
		
		//alert("/findBestAttackPosition " + su.unitID + "," + target.unitID +" @(" + bestGP.x +","+bestGP.y + ")");
		
		return bestGP;
	}

    findOppoUnitAndAttack(suIdx) {
        let su = this.suList[suIdx];
		let flagDone = false;
		
        su.pathData.listAttackable.forEach(gp => {
			if (flagDone) return;
			let target = this.hGame.findOppoUnitByGridPos(this.isEnemy, gp);
			if (target !== null) {
				//alert("found target");
				let destGP = this.findBestAttackPosition(su, target);
				if (destGP !== null) {
					this.executeMoveAttack(
						su, 
						destGP, 
						target
					);
					flagDone = true;
					return; // you can't just return true here because it's inside a anonymous func
						// and you can't assume fOUAA ends here because it's inside a forEach loop!
						// the moral is: old for loop RULES
				}
            }
        });
        return flagDone;
    }
	
	//return +1: advantage;  -1: disadvantage;  0: tie or N/A
	compareZokusei(su, ou) {
		if (su.params === null || ou.params === null) return 0;
		if (su.params.zokusei === undefined || ou.params.zokusei === undefined) return 0;
		if (su.params.zokusei === zoku.none || ou.params.zokusei === zoku.none) return 0;
		if (su.params.zokusei === zoku.red && ou.params.zokusei === zoku.green ||
			su.params.zokusei === zoku.green && ou.params.zokusei === zoku.blue ||
			su.params.zokusei === zoku.blue && ou.params.zokusei === zoku.red)
			return +1;
		if (ou.params.zokusei === zoku.red && su.params.zokusei === zoku.green ||
			ou.params.zokusei === zoku.green && su.params.zokusei === zoku.blue ||
			ou.params.zokusei === zoku.blue && su.params.zokusei === zoku.red)
			return -1;
		return 0;
	}

	// define how zokusei works for deciding chase target
	zokuseiChasingDistScore(su, ou) {
		let rate = 1; // replace it when chasing skills are implemented
		return (-(rate * su.moveDist) - 0.5) * this.compareZokusei(su, ou);
	}

	// for chasing gp tiebreaker
	getChasingPosScore(su, gp, target) {
		let score = 0;
		let len = this.ouList.length;
		for (let i = 0; i < len; i ++) {
			let z = this.compareZokusei(su, this.ouList[i]);
			score += 100 * this.ouPDIR[i].dist[gp.x][gp.y] * (-z);
		}
		score -= Math.abs(
			Math.abs(target.gridPos.x - gp.x) - 
			Math.abs(target.gridPos.y - gp.y)
		);
		return score;
	}

    tryGetClose(suIdx) {
        let su = this.suList[suIdx];
        if (su.pathData.listPossibleDest.length === 0) return false;

        let minDist = 10000;
        let bestGP = null;
		let bestTarget = null;
		let bestScore = null;
        su.pathData.listPossibleDest.forEach(gp => {
            if (this.hGame.findSelfUnitByGridPos(this.isEnemy, gp) !== null &&
				this.hGame.findSelfUnitByGridPos(this.isEnemy, gp) !== su)
                return;
            //alert("gp: " + gp.x + "," + gp.y);
            let pdir = this.hGame.pathFinder.floodFill(su, gp, 300, true);
            this.ouList.forEach(target => {
                let distTarget =
                    pdir.dist[target.gridPos.x][target.gridPos.y]
					+ this.zokuseiChasingDistScore(su, target);
                //alert(target.unitID + "," + distTarget);
                if (distTarget < minDist) {
                    minDist = distTarget;
                    bestGP = gp;
					bestTarget = target;
					bestScore = this.getChasingPosScore(su, gp, target);
					//alert(target.unitID + " @ "+gp.x+","+gp.y+" : "+bestScore);
                } else if (distTarget === minDist) {
					let newScore = this.getChasingPosScore(su, gp, target);
					//alert(target.unitID + " @ "+gp.x+","+gp.y+" : "+newScore);
					if (newScore > bestScore) {
						bestGP = gp;
						bestTarget = target;
						bestScore = newScore;
					}
				}
            });
        });
        //alert(minDist + " @ (" + bestGP.x + "," + bestGP.y + ") -> " + bestTarget.nameStr);
        if (bestGP !== null) {
            this.executeMove(su, bestGP);
            return true;
        }

        return false;
    }
	
	findClosestUnit() {
		let minDist = 10000;
		let closestUnitIdx = null;
		
		let len = this.suList.length;
        for (let i = 0; i < len; i++) {
			let su = this.suList[i];
			if (!su.isActive()) continue;
			this.ouList.forEach(ou => {
				//let dist = Math.abs(su.gridPos.x - ou.gridPos.x) + Math.abs(su.gridPos.y - ou.gridPos.y);
				let dist = this.suPDIR[i].dist[ou.gridPos.x][ou.gridPos.y];
				//alert(su.unitID+" -> "+ou.unitID +" = "+ dist);
				if (dist < minDist) {
					minDist = dist;
					closestUnitIdx = i;
				}
			});
		}
		
		return closestUnitIdx;
	}

	// update path data with inf search range
	updatePDIR() {
		let suLen = this.suList.length;
		this.suPDIR = [];
		for (let i = 0; i < suLen; i ++) {
			this.suPDIR[i] = this.hGame.pathFinder.floodFill(
				this.suList[i], this.suList[i].gridPos, 300, true
			);
		}
		let ouLen = this.ouList.length;
		this.ouPDIR = [];
		for (let i = 0; i < ouLen; i ++) {
			this.ouPDIR[i] = this.hGame.pathFinder.floodFill(
				this.ouList[i], this.ouList[i].gridPos, 300, true
			);
		}
	}

    makeOneMove() {
		this.updatePDIR();
		let suIdx = this.findClosestUnit();
		if (suIdx !== null) {
			let res = this.findOppoUnitAndAttack(suIdx);
			if (res === false) res = this.tryGetClose(suIdx);
			if (res === false) this.executeWait(this.suList[suIdx]);
		}
    }

    update(df) {
        this.blockFrameRemain -= df;
        if (this.blockFrameRemain <= 0) {
            this.makeOneMove();
        }
    }
}
