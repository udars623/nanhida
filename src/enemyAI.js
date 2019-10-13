import AbstractController from "/src/abstractController";
import consts from "/src/consts";

const dx = [0, -1, +1, 0];
const dy = [+1, 0, 0, -1];

export default class EnemyAI {
    constructor(hGame, isEnemy) {
        this.hGame = hGame;
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
        this.blockFrameRemain = this.blockFramePerWait;
    }

    executeMove(unit, dest) {
        this.absCon.clickGP(unit.gridPos);
        this.absCon.clickGP(dest);
        this.absCon.clickGP(dest);
        this.blockFrameRemain = this.blockFramePerMove;
    }

    executeMoveAttack(unit, dest, target) {
        //alert(unit.gridPos + ", " + dest.gridPos + ", " + target.gridPos);
        this.absCon.clickGP(unit.gridPos);
        if (dest.x === unit.gridPos.x && dest.y === unit.gridPos.y) {
            this.absCon.clickGP(target.gridPos);
            //alert("123");
            this.absCon.clickGP(target.gridPos);
            //alert("123");
        } else {
            this.absCon.clickGP(dest);
            this.absCon.clickGP(target.gridPos);
            this.absCon.clickGP(target.gridPos);
        }
        this.blockFrameRemain = this.blockFramePerAttack;
    }

    findOppoUnitAndAttack(suIdx) {
        let su = this.suList[suIdx];

        su.pathData.listPossibleDest.forEach(gp => {
            for (let i = 0; i < 4; i++) {
                let target = this.hGame.findOppoUnitByGridPos(this.isEnemy, {
                    x: gp.x + dx[i],
                    y: gp.y + dy[i]
                });
                if (target !== null) {
                    //alert("found target");
                    this.executeMoveAttack(su, gp, target);
                    return true;
                }
            }
        });
        return false;
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
