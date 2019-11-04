import consts from "/src/consts";

let terrainTypes = consts.terrainTypes;

export default class UnitBase {
    constructor(unitID, hGame, gridPos, isEnemy) {
        this.unitID = unitID;
        this.hGame = hGame;
        this.gridPos = gridPos;

		this.nameStr = "nannhidaman";
		this.imageID = "img_kenshi";
        this.imageSize = {
            x: hGame.gridSize,
            y: hGame.gridSize
        };
		
        this.isEnemy = isEnemy;

		this.staminaMax = 1;
		this.moveDistMax = 2;
		this.attackRange = 1;
		this.params = null;
		this.moveType = consts.moveTypes.infantry;
		
        this.pathData = null;
		this.skillList = [];
    }
	
	createSkills() {
		if (this.params !== null && 
			typeof(this.params.skills) !== "undefined" &&
			this.params.skills !== null
		) {
			this.params.skills.forEach(skillLevelPair => {
				let newSkill = this.hGame.skillCreator.createSkill(
					this, 
					skillLevelPair.skill,
					skillLevelPair.level,
				);
				if (newSkill.isFighterSkill === true && this.isFighter === false) return;
				this.skillList.push(newSkill);
			});
		}
	}
	
	applyPassiveSkills() {
		this.skillList.forEach(skill => {
			if (skill.isPassive === true) {
				skill.applyOnce();
			}
		});
	}
	
	// need to be called manually by Game after creation
	initAfterCreation() {
		this.createSkills();
		this.applyPassiveSkills();
		
		this.image = document.getElementById(this.imageID);
		
		let zokuStr = "img_effect_zoku_grey";
		if (this.params !== null && this.params.zokusei !== undefined) {
			if (this.params.zokusei === consts.zokusei.red) zokuStr = "img_effect_zoku_red";
			if (this.params.zokusei === consts.zokusei.blue) zokuStr = "img_effect_zoku_blue";
			if (this.params.zokusei === consts.zokusei.green) zokuStr = "img_effect_zoku_green";
		}
		this.imageZokusei = document.getElementById(zokuStr);
		
		this.hp = 1;
        this.attack = 255;
        this.alive = true;
		this.stamina = 0;
		this.moveDist = this.moveDistMax;
		
		this.updateCoordinate();
		
		this.resetControlState();
		this.resetProposal();
		
		if (consts.settings.showUnitID === true) {
			this.nameStr = this.nameStr + " (" + this.unitID + ")";
		}
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

	isAlive() {
		return (this.hp > 0);
	}

    eventNewTurn() {
        // reset stamina
        this.stamina = this.staminaMax;

        // reset buffs & debuffs?
        this.moveDist = this.moveDistMax;
    }

	// super important stuff
    eventRequirePathUpdate() {
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

	checkTerrain(gridPos) {
		if (this.moveType === consts.moveTypes.flyer) return true;
		
		if (this.hGame.stage.getTerrain(gridPos.x, gridPos.y) !==
            terrainTypes.Nrm
        ) 	return false;

        return true;
	}

	// for MoveAssist.checkEligibility
	checkStopable(gridPos, ignoreUnit) {
		let unit = this.hGame.findUnitByGridPos(gridPos);
		if (unit !== null && 
			unit !== ignoreUnit &&
			unit !== this
		) return false;
		
		return this.checkTerrain(gridPos);
	}

    checkPassable(gridPos, flagIgnoreEnemyUnit = false) {
        // movement types vs terrains, pass skill vs enemy etc.
        if (!flagIgnoreEnemyUnit &&
            this.hGame.findOppoUnitByGridPos(this.isEnemy, gridPos) !== null
        )	return false;

        return this.checkTerrain(gridPos);
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
        this.pathToDestProposalCoord = [];
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

	// possibly the stupidest thing in this class
	updateCoordinate() {
		this.coordinate = this.hGame.gridPosToPos(this.gridPos);
	}

    eventExecuteMovement() {
		this.stamina = 1; // to make sure it becomes 0 after executeAction
        this.gridPos = this.destProposalGP;
        this.updateCoordinate();
        this.executeAction();
    }
	
	eventUseMoveAssist(gpNew) {
		this.gridPos = gpNew;
		this.updateCoordinate();
		this.executeAction();
	}
	
	eventMovedByMoveAssist(gpNew) {
		this.gridPos = gpNew;
		this.updateCoordinate();
	}
	
	// used in e.g. resolving reinforcement conflict
	eventForceMovement(gpNew) {
		this.gridPos = gpNew;
		this.updateCoordinate();
	}

    checkAttackTarget(unit, destProposalGP) {
		if (this.attackRange === 0) return false;
        if (Math.abs(unit.gridPos.x - destProposalGP.x) +
            Math.abs(unit.gridPos.y - destProposalGP.y) ===
            this.attackRange
        )	return true;
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
        this.updateCoordinate();
        this.hGame.eventBattle(this, unit);
        this.executeAction();
    }

    eventExecuteWait() {
		this.stamina = 1; // to make sure it becomes 0 after executeAction
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
        let flag = (
            this.isEnemy && (this.hGame.currentPhase === this.hGame.PHASE_ENEMY) ||
            !this.isEnemy && (this.hGame.currentPhase === this.hGame.PHASE_PLAYER) 
        );
		return flag;
    }

    update(df) {}
	
	drawThreat(ctx) {
		if (this.isSelected) {
			ctx.fillStyle = "rgba(255,238,238,0.8)";
			this.pathData.listAttackable.forEach(obj => {
				if (!this.hGame.pathFinder.isReachable(this.pathData, obj.gp)) {
					let pos = this.hGame.gridPosToPos(obj.gp);
					ctx.fillRect(
						pos.x - this.imageSize.x * 0.45,
						pos.y - this.imageSize.y * 0.45,
						this.imageSize.x * 0.9,
						this.imageSize.y * 0.9
					);
				}
			});
			ctx.fillStyle = "rgba(238,238,255,0.5)";
			this.pathData.listPossibleDest.forEach(gp => {
				let pos = this.hGame.gridPosToPos(gp);
				ctx.fillRect(
					pos.x - this.imageSize.x * 0.45,
					pos.y - this.imageSize.y * 0.45,
					this.imageSize.x * 0.9,
					this.imageSize.y * 0.9
				);
			});
		}
	}

    drawUnitBG(ctx) {
		let halfscale = 0.47;
		
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
            this.coordinate.x - this.imageSize.x * halfscale,
            this.coordinate.y - this.imageSize.y * halfscale,
            this.imageSize.x * 2 * halfscale,
            this.imageSize.y * 2 * halfscale
        );

        if (this.hasDestProposal) {
            if (this.pathToDestProposal !== null) {
                if (this.isEnemy) ctx.fillStyle = "rgba(255,170,170,0.7)";
                else ctx.fillStyle = "rgba(170,204,255,0.7)";
                let len = this.pathToDestProposal.length;
                for (let i = 1; i < len; i++) {
                    ctx.fillRect(
                        this.pathToDestProposalCoord[i].x -
                            this.imageSize.x * halfscale,
                        this.pathToDestProposalCoord[i].y -
                            this.imageSize.y * halfscale,
                        this.imageSize.x * 2 * halfscale,
                        this.imageSize.y * 2 * halfscale
                    );
                }
            }

            if (this.isEnemy) ctx.fillStyle = "#e88";
            else ctx.fillStyle = "#88e";
            ctx.fillRect(
                this.destProposalCoord.x - this.imageSize.x * halfscale,
                this.destProposalCoord.y - this.imageSize.y * halfscale,
                this.imageSize.x * 2 * halfscale,
                this.imageSize.y * 2 * halfscale
            );
        }
    }

    drawUnit(ctx) {
		if (this.isAlive()) {
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
				ctx.drawImage(
					this.imageZokusei,
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
				ctx.drawImage(
					this.imageZokusei,
					this.coordinate.x - (this.imageSize.x * this.drawScale) / 2,
					this.coordinate.y - (this.imageSize.y * this.drawScale) / 2,
					this.imageSize.x * this.drawScale,
					this.imageSize.y * this.drawScale
				);
			}
		} else {
			if (this.graveImage === undefined) 
				this.graveImage = document.getElementById("img_dead");
			
			ctx.drawImage(
				this.graveImage,
				this.coordinate.x - (this.imageSize.x * this.drawScale) / 2,
				this.coordinate.y - (this.imageSize.y * this.drawScale) / 2,
				this.imageSize.x * this.drawScale,
				this.imageSize.y * this.drawScale
			);
		}
    }
}
