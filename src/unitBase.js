import consts from "/src/consts";

let terrainTypes = consts.terrainTypes;

export default class UnitBase {
    constructor(unitID, hGame, gridPos, isEnemy, imageId) {
        this.unitID = unitID;

        this.image = document.getElementById(imageId);
        this.hGame = hGame;
        this.gridPos = gridPos;
        this.coordinate = hGame.gridPosToPos(gridPos);
        this.imageSize = {
            x: hGame.gridSize,
            y: hGame.gridSize
        };

        this.isEnemy = isEnemy;

        this.hp = 1;
        this.attack = 255;
        this.alive = true;

        this.stamina = 0;
        this.staminaMax = 1;

        this.moveDist = 0;
        this.moveDistMax = 2;
        this.attackRange = 1;

        this.pathData = null;

        this.resetControlState();
        this.resetProposal();
    }

    resetControlState() {
        this.drawScale = 1;
        this.isSelected = false;
        this.isTargeted = false;
    }

    resetProposal() {
        this.hasDestProposal = false;
        this.destProposalGP = null;
        this.destProposalCoord = null;
        this.pathToDestProposal = null;
        this.pathToDestProposalCoord = null;
        this.hasTargetProposal = false;
        this.targetProposal = null;
        this.isTargeted = false;
    }

    isActive() {
        if (this.stamina <= 0) return false;
        return true;
    }

    eventNewTurn() {
        // reset stamina
        this.stamina = this.staminaMax;

        // reset buffs & debuffs?
        this.moveDist = this.moveDistMax;

        // update path stuffs
        this.updatePathData();
    }

    eventSenjoUpdated() {
        this.updatePathData();
    }

    updatePathData() {
        this.pathData = this.hGame.pathFinder.floodFill(
            this,
            this.gridPos,
            this.moveDist
        );
    }

    eventSelect() {
        this.isSelected = true;
        this.drawScale = 1.15;
    }

    eventDeselect() {
        this.resetControlState();
        this.resetProposal();
    }

    checkPassable(gridPos, flagIgnoreUnit = false) {
        // movement types vs terrains, pass skill vs enemy etc.
        if (
            !flagIgnoreUnit &&
            this.hGame.findOppoUnitByGridPos(this.isEnemy, gridPos) !== null
        )
            return false;

        if (
            this.hGame.stage.getTerrain(gridPos.x, gridPos.y) !==
            terrainTypes.Nrm
        )
            return false;

        return true;
    }

    checkMoveDestination(gridPos) {
        if (
            Math.abs(gridPos.x - this.gridPos.x) +
                Math.abs(gridPos.y - this.gridPos.y) >
            this.moveDistMax
        )
            return false;

        if (this.hGame.pathFinder.isReachable(this.pathData, gridPos)) {
            //this.acceptPath(path);
            return true;
        }
        return false;
    }

    acceptPath(path) {
        this.pathToDestProposal = path;
        this.pathToDestProposalCoord = [path.length];
        let len = path.length;
        for (let i = 0; i < len; i++) {
            //alert(i + "," + path[i].x + "," + path[i].y);
            this.pathToDestProposalCoord[i] = this.hGame.gridPosToPos(path[i]);
        }
    }

    eventProposeDestination(destGP) {
        this.hasDestProposal = true;
        this.destProposalGP = destGP;
        this.destProposalCoord = this.hGame.gridPosToPos(destGP);
        this.acceptPath(
            this.hGame.pathFinder.retrievePath(
                this.pathData,
                this.gridPos,
                destGP
            )
        );
    }

    executeAction() {
        this.stamina--;
        this.resetProposal();
        this.hGame.eventActionExecuted();
    }

    eventExecuteMovement() {
        this.gridPos = this.destProposalGP;
        this.coordinate = this.hGame.gridPosToPos(this.gridPos);
        this.executeAction();
    }

    checkAttackTarget(unit, destProposalGP) {
        if (
            Math.abs(unit.gridPos.x - destProposalGP.x) +
                Math.abs(unit.gridPos.y - destProposalGP.y) ===
            this.attackRange
        )
            return true;
        return false;
    }

    eventProposeTarget(unit) {
        this.targetProposal = unit;
        this.hasTargetProposal = true;
    }

    eventBeTargeted() {
        this.isTargeted = true;
    }

    eventStopBeingTargeted() {
        this.isTargeted = false;
    }

    eventExecuteAttack(unit) {
        this.gridPos = this.destProposalGP;
        this.coordinate = this.hGame.gridPosToPos(this.gridPos);
        this.hGame.eventBattle(this, unit);
        this.executeAction();
    }

    eventExecuteWait() {
        this.executeAction();
    }

    eventLoseHP(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.alive = false;
            this.hGame.eventUnitDeath(this);
        }
    }

    isInPhase() {
        return (
            this.isEnemy ===
            (this.hGame.currentPhase === this.hGame.PHASE_ENEMY)
        );
    }

    update(df) {}

    drawUnitBG(ctx) {
        if (this.isSelected || this.isTargeted) {
            if (this.isEnemy) ctx.fillStyle = "rgba(255,85,85,0.9)";
            else ctx.fillStyle = "rgba(136,136,238,0.9)";
        } else if (this.isActive() || !this.isInPhase()) {
            if (this.isEnemy) ctx.fillStyle = "rgba(255,140,140,0.8)";
            else ctx.fillStyle = "rgba(170,170,255,0.8)";
        } else {
            if (this.isEnemy) ctx.fillStyle = "rgba(255,238,238,0.8)";
            else ctx.fillStyle = "rgba(238,238,255,0.8)";
        }
        ctx.fillRect(
            this.coordinate.x - this.imageSize.x * 0.45,
            this.coordinate.y - this.imageSize.y * 0.45,
            this.imageSize.x * 0.9,
            this.imageSize.y * 0.9
        );

        if (this.hasDestProposal) {
            if (this.pathToDestProposal !== null) {
                if (this.isEnemy) ctx.fillStyle = "rgba(255,170,170,0.7)";
                else ctx.fillStyle = "rgba(170,204,255,0.7)";
                let len = this.pathToDestProposal.length;
                for (let i = 1; i < len; i++) {
                    ctx.fillRect(
                        this.pathToDestProposalCoord[i].x -
                            this.imageSize.x * 0.45,
                        this.pathToDestProposalCoord[i].y -
                            this.imageSize.y * 0.45,
                        this.imageSize.x * 0.9,
                        this.imageSize.y * 0.9
                    );
                }
            }

            if (this.isEnemy) ctx.fillStyle = "#e88";
            else ctx.fillStyle = "#88e";
            ctx.fillRect(
                this.destProposalCoord.x - this.imageSize.x * 0.45,
                this.destProposalCoord.y - this.imageSize.y * 0.45,
                this.imageSize.x * 0.9,
                this.imageSize.y * 0.9
            );
        }
    }

    drawUnit(ctx) {
        if (this.hasDestProposal) {
            ctx.drawImage(
                this.image,
                this.destProposalCoord.x -
                    (this.imageSize.x * this.drawScale) / 2,
                this.destProposalCoord.y -
                    (this.imageSize.y * this.drawScale) / 2,
                this.imageSize.x * this.drawScale,
                this.imageSize.y * this.drawScale
            );
        } else {
            ctx.drawImage(
                this.image,
                this.coordinate.x - (this.imageSize.x * this.drawScale) / 2,
                this.coordinate.y - (this.imageSize.y * this.drawScale) / 2,
                this.imageSize.x * this.drawScale,
                this.imageSize.y * this.drawScale
            );
        }
    }
}
