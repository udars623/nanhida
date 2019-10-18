//import UnitBase from "/src/unitBase";
import Grid from "/src/grid";
import EffectStartPhase from "/src/effects/effectStartPhase";
import EnemyAI from "/src/enemyAI";
import PathFinder from "/src/pathFinder";
import consts from "/src/consts";
import Button from "/src/button";
import StageList from "/src/stages/stageList";
import UnitCreator from "/src/units/unitCreator";
import MoveAssistList from "/src/skills/moveAssistList";
import ThreatMap from "/src/ui/threatMap";

export default class Game {
    constructor(gameWidth, gameHeight, canvas) {
        this.PHASE_NONE = 0;
        this.PHASE_PLAYER = 1;
        this.PHASE_ENEMY = 2;

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.hCanvas = canvas;

        this.maxGrid = { x: 6, y: 8 };

        this.gridSize = gameWidth / this.maxGrid.x;
        this.grid = new Grid(this.gridSize, this.maxGrid);
		
		this.stageList = new StageList();
		this.unitCreator = new UnitCreator();
		this.moveAssistList = new MoveAssistList(this);
	
		this.buttonList = [];
		this.makeButtons();
		
		this.resetGameState();
    }
	
	resetGameState() {
        this.playerUnitList = [];
        this.enemyUnitList = [];
        this.unitID = 0;

        this.effectList = [];

        this.currentPhase = this.PHASE_NONE;
        this.isPhaseBlocked = false;
        this.framesBeforeChangePhase = 0;

        this.turn = 0;
        this.stage = null;
        this.enemyAI = new EnemyAI(this, true);
        this.pathFinder = new PathFinder(this);

        this.gameResult = consts.gameResult.None;	
		
		this.threatMap = new ThreatMap(this);
	}
	
	makeButtons() {
		this.buttonList.push(new Button(
			this, "img_button_wait", consts.buttons.Wait, {x:7, y:1}
		));
		this.buttonList.push(new Button(
			this, "img_button_turn_end", consts.buttons.TurnEnd, {x:7, y:2}
		));
		
		this.buttonList.push(new Button(
			this, "img_button_threat", consts.buttons.Threat, {x:7, y:8}
		));
	}

    bindPlayerInputHandler(inputHandler) {
        this.playerInputHandler = inputHandler;
    }

    eventPlaceUnit(gridPos, isEnemy, typeID, params) {
        this.unitID++;
		
		// WARNING: hasn't check the position yet!!!
		// need to implement check before using reinforcements!
		
		let list = isEnemy ? this.enemyUnitList : this.playerUnitList;
		let newUnit = this.unitCreator.createUnit(
			this.unitID, this, gridPos, isEnemy, typeID, params
		);
		list.push(newUnit);
		newUnit.initAfterCreation();
    }
	
	startDefaultStage() {
		this.start(this.stageList.defaultStageIdx);
	}

    start(stageIdxStr) {
		//alert("start")
		this.resetGameState();
		
		this.stageList.loadStage(stageIdxStr, this);
				
        this.stage.initStage(this);
		
        this.playerPhase();
		this.requirePathUpdate();
    }

	requirePathUpdate() {
		this.playerUnitList.forEach(object => object.eventRequirePathUpdate());
        this.enemyUnitList.forEach(object => object.eventRequirePathUpdate());
		
		this.updateThreatMap();
	}

	updateThreatMap() {
		this.threatMap.updateThreatMap();
	}
	
	toggleThreat() {
		this.threatMap.toggleThreat();
	}

	countActiveUnits() {
		let count = 0;
		let list = null;
		if (this.currentPhase === this.PHASE_PLAYER) list = this.playerUnitList;
		if (this.currentPhase === this.PHASE_ENEMY) list = this.enemyUnitList;
		if (list === null) return 0;
		list.forEach(unit => {
			if (unit.isActive()) count ++;
		});
		return count;
	}

    eventActionExecuted() {
        if (this.countActiveUnits() === 0) {
            this.endPhase();
        }
        
		this.requirePathUpdate();
    }

	eventButtonTurnEnd() {
		let list = (this.currentPhase === this.PHASE_PLAYER) ? 
			this.playerUnitList : this.enemyUnitList;
		
		list.forEach(unit => {
			if (unit.isActive()) unit.eventExecuteWait();
		});

	}

    playerPhase() {
        //alert("Player Phase");
        this.turn++;
        this.currentPhase = this.PHASE_PLAYER;
        this.playerUnitList.forEach(object => {
            object.eventNewTurn();
        });
    }

    enemyPhase() {
        //alert("Enemy Phase");
        this.currentPhase = this.PHASE_ENEMY;
        this.enemyUnitList.forEach(object => {
            object.eventNewTurn();
        });
        //this.endPhase();
    }

    endPhase() {
        this.stage.endTurn(this);
        this.framesBeforeChangePhase = 80;
        this.isPhaseBlocked = true;
        if (this.currentPhase === this.PHASE_PLAYER) {
            this.effectList.push(new EffectStartPhase(this, true));
        } else {
            this.effectList.push(new EffectStartPhase(this, false));
        }
    }

    procChangePhase(df) {
        this.framesBeforeChangePhase -= df;
        if (this.framesBeforeChangePhase <= 0) {
            this.isPhaseBlocked = false;
            if (this.currentPhase === this.PHASE_PLAYER) {
                this.enemyPhase();
            } else if (this.currentPhase === this.PHASE_ENEMY) {
                this.playerPhase();
            }
        }
    }

    findUnitInListByGridPos(unitList, gridPos) {
        let len = unitList.length;
        for (let i = 0; i < len; i++) {
            if (
                unitList[i].gridPos.x === gridPos.x &&
                unitList[i].gridPos.y === gridPos.y
            ) {
                return unitList[i]; // only one unit should be triggered
            }
        }
        return null;
    }

    findPlayerUnitByGridPos(gridPos) {
        //alert(gridPos.x + ", " + gridPos.y);
        return this.findUnitInListByGridPos(this.playerUnitList, gridPos);
    }

    findEnemyUnitByGridPos(gridPos) {
        return this.findUnitInListByGridPos(this.enemyUnitList, gridPos);
    }

    findSelfUnitByGridPos(isEnemy, gridPos) {
        if (isEnemy) return this.findEnemyUnitByGridPos(gridPos);
        else return this.findPlayerUnitByGridPos(gridPos);
    }

    findOppoUnitByGridPos(isEnemy, gridPos) {
        if (isEnemy) return this.findPlayerUnitByGridPos(gridPos);
        else return this.findEnemyUnitByGridPos(gridPos);
    }

    findUnitByGridPos(gridPos) {
        let unit = this.findPlayerUnitByGridPos(gridPos);
        if (unit !== null) return unit;
        unit = this.findEnemyUnitByGridPos(gridPos);
        if (unit !== null) return unit;
        return null;
    }

	findButton(pos) {
		let result = null;
		this.buttonList.forEach(button => {
			if (button.checkClick(pos)) {
				result = button.buttonID;
				button.eventClick();
			}
		});
		return result;
	}

    mouseClick(pos) {
        // do nothing
    }

    eventBattle(attacker, target) {
        target.eventLoseHP(attacker.attack);
    }

    eventUnitDeath(unit) {
        if (unit.isEnemy) removeObjectFromList(unit, this.enemyUnitList);
        else removeObjectFromList(unit, this.playerUnitList);

        if (this.enemyUnitList.length <= 0)
            this.gameResult = consts.gameResult.Win;
        else if (this.playerUnitList.length <= 0) {
            this.gameResult = consts.gameResult.Lose;
        }
    }

    eventEffectEnd(effect) {
        removeObjectFromList(effect, this.effectList);
    }

	// called by abstractController, pass to this.moveAssistList
	checkMoveAssist(user, dest, target) {
		if (user.params === null || 
			typeof(user.params.moveAssist) === "undefined" ||
			user.params.moveAssist === null
		) return false;
		return this.moveAssistList.checkEligibility(user.params.moveAssist, user, dest, target);
	}

	// called by abstractController, pass to this.moveAssistList
	eventExecuteMoveAssist(user, target) {
		if (user.params === null || 
			typeof(user.params.moveAssist) === "undefined" ||
			user.params.moveAssist === null
		) return false;
		return this.moveAssistList.execute(user.params.moveAssist, user, target);
	}

    update(df) {
		this.buttonList.forEach(object => object.update(df));
		
        if (this.framesBeforeChangePhase > 0) this.procChangePhase(df);
        if (this.currentPhase === this.PHASE_ENEMY) this.enemyAI.update(df);
        this.playerInputHandler.update(df);

        this.playerUnitList.forEach(object => object.update(df));
        this.enemyUnitList.forEach(object => object.update(df));
		
        this.effectList.forEach(object => object.update(df));
		
		if (this.gameResult === consts.gameResult.Win) {
			alert("You win!");
			this.gameResult = consts.gameResult.GameEnded;
		}
		if (this.gameResult === consts.gameResult.Lose) {
			alert("GAME OVER");
			this.gameResult = consts.gameResult.GameEnded;
		}

    }

    draw(ctx) {
        this.stage.draw(ctx);
		this.buttonList.forEach(object => object.draw(ctx));
        this.grid.draw(ctx);
		
		this.playerUnitList.forEach(object => object.drawThreat(ctx));
        this.enemyUnitList.forEach(object => object.drawThreat(ctx));
        this.playerUnitList.forEach(object => object.drawUnitBG(ctx));
        this.enemyUnitList.forEach(object => object.drawUnitBG(ctx));
        this.playerUnitList.forEach(object => object.drawUnit(ctx));
        this.enemyUnitList.forEach(object => object.drawUnit(ctx));
		
		this.threatMap.draw(ctx);

        this.effectList.forEach(object => object.draw(ctx));

        if (this.gameResult !== consts.gameResult.None) {
            //alert("oxoxoxox");
        }
    }

    gridPosToPos(gridPos) {
        return {
            x: gridPos.x * this.gridSize - this.gridSize / 2,
            y: gridPos.y * this.gridSize - this.gridSize / 2
        };
    }
	
	// if making too many {} is really a problem then use this
	gridPosToPosX(gpx) {
		return gpx * this.gridSize - this.gridSize / 2;
	}
	
	gridPosToPosY(gpy) {
		return gpy * this.gridSize - this.gridSize / 2;
	}

    posToGridPos(pos) {
        return {
            x: Math.floor(pos.x / this.gridSize) + 1,
            y: Math.floor(pos.y / this.gridSize) + 1
        };
    }
}

function removeObjectFromList(object, list) {
    let len = list.length,
        i = 0;
    for (i = 0; i < len; i++) {
        if (list[i] === object) break;
    }
    list.splice(i, 1);
}
