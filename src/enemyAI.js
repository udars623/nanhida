import AbstractController from "/src/abstractController";
import consts from "/src/consts";

// remember to check 1~maxGrid when using this stuff
let dAtk = [3];
dAtk[0] = [];
dAtk[1] = [{x:0, y:+1}, {x:-1, y:0}, {x:+1, y:0}, {x:0, y:-1} ];
dAtk[2] = [{x:0, y:+2}, {x:-1, y:+1}, {x:+1, y:+1}, {x:-2, y:0},
			{x:+2, y:0}, {x:-1, y:-1}, {x:+1, y:-1}, {x:0, y:-2}];
const MAX_DIST = 100000;

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

        this.blockFrameRemain = 0;
        this.blockFramePerAttack = 18;
        this.blockFramePerMove = 18;
        this.blockFramePerWait = 5;
    }

    executeWait(unit) {
        this.absCon.clickGP(unit.gridPos);
        this.absCon.clickButton(consts.buttons.Wait);
		this.absCon.clickButton(consts.buttons.Wait);
        this.blockFrameRemain = this.blockFramePerWait;
    }

    executeMove(unit, dest) {
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

    tryGetClose(suIdx) {
        let su = this.suList[suIdx];
        if (su.pathData.listPossibleDest.length === 0) return false;

        let minDist = 10000;
        let bestGP = null;
        su.pathData.listPossibleDest.forEach(gp => {
            if (this.hGame.findSelfUnitByGridPos(this.isEnemy, gp) !== null)
                return;
            //alert("gp: " + gp.x + "," + gp.y);
            let wideSearch = this.hGame.pathFinder.floodFill(su, gp, 300, true);
            this.ouList.forEach(target => {
                let distTarget =
                    wideSearch.dist[target.gridPos.x][target.gridPos.y];
                //alert(target.unitID + "," + distTarget);
                if (distTarget < minDist) {
                    minDist = distTarget;
                    bestGP = gp;
                }
            });
        });
        //alert(minDist + ", " + bestGP);
        if (bestGP !== null) {
            this.executeMove(su, bestGP);
            return true;
        }

        return false;
    }

    makeOneMove() {
        let i = 0,
            len = this.suList.length;
        for (i = 0; i < len; i++) {
            if (this.suList[i].stamina > 0) {
                let res = this.findOppoUnitAndAttack(i);
                if (res === false) res = this.tryGetClose(i);
                if (res === false) this.executeWait(this.suList[i]);
				
                return;
            }
        }
    }

    update(df) {
        this.blockFrameRemain -= df;
        if (this.blockFrameRemain <= 0) {
            this.makeOneMove();
        }
    }
}
