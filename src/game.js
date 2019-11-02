//import UnitBase from "/src/unitBase";
import Grid from "/src/grid";
import EffectStartPhase from "/src/effects/effectStartPhase";
import EffectGameOver from "/src/effects/effectGameOver";
import EffectStageClear from "/src/effects/effectStageClear";
import EnemyAI from "/src/enemyAI";
import PathFinder from "/src/pathFinder";
import consts from "/src/consts";
import Button from "/src/button";
import StageList from "/src/stages/stageList";
import UnitCreator from "/src/units/unitCreator";
import SkillCreator from "/src/skills/skillCreator";
import MoveAssistList from "/src/skills/moveAssistList";
import ThreatMap from "/src/ui/threatMap";
import StatusPanel from "/src/ui/statusPanel";
import GeneralTimer from "/src/ui/generalTimer";

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
		this.skillCreator = new SkillCreator();
	
		this.buttonList = [];
		this.makeButtons();
		
		this.resetGameState();
    }
	
	resetGameState() {
        this.playerUnitList = [];
        this.enemyUnitList = [];
        this.unitID = 0;

        this.effectList = [];
		this.timerList = [];

        this.currentPhase = this.PHASE_NONE;
        this.isPhaseBlocked = false;
        this.framesBeforeChangePhase = 0;

        this.turn = 0;
        this.stage = null;
        this.enemyAI = new EnemyAI(this, true);
        this.pathFinder = new PathFinder(this);

        this.gameResult = consts.gameResult.None;	
		
		this.threatMap = new ThreatMap(this);
		this.statusPanel = new StatusPanel(this);
		
		this.flagDrawAllBarrier = false;
		this.flagUnitSelected = false;
		this.barrierConnectionTimer = new GeneralTimer(this, 0.04, 3);
		this.timerList.push(this.barrierConnectionTimer);
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
		
		this.buttonList.push(new Button(
			this, "img_button_barrier", consts.buttons.Barrier, {x:7, y:7}
		));
	}

    bindPlayerInputHandler(inputHandler) {
        this.playerInputHandler = inputHandler;
    }

    eventPlaceUnit(gridPos, isEnemy, typeID, params) {
        this.unitID++;
		
		let flagConflict = false;
		if (this.findUnitByGridPos(gridPos) !== null) {
			flagConflict = true;
			//alert("unit placement conflict detected");
		}
		
		let list = isEnemy ? this.enemyUnitList : this.playerUnitList;
		let newUnit = this.unitCreator.createUnit(
			this.unitID, this, gridPos, isEnemy, typeID, params
		);
		list.push(newUnit);
		newUnit.initAfterCreation();
		
		if (flagConflict) this.resolveNewUnitConflict(newUnit);
		
		//alert("unit created with ID = " + this.unitID);
    }
	
	resolveNewUnitConflict(unit) {
		let pdir = this.pathFinder.floodFill(unit, unit.gridPos, 300, true);
		let len = pdir.listPossibleDest.length;
		for (let i = 0; i < len; i ++) {
			if (this.findUnitByGridPos(pdir.listPossibleDest[i]) === null) {
				unit.eventForceMovement(pdir.listPossibleDest[i]);
				//alert("Replace new unit to "+unit.gridPos.x+","+unit.gridPos.y);
				break;
			}
		}
		
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
	
	toggleBarrier() {
		this.flagDrawAllBarrier = !this.flagDrawAllBarrier;
		this.barrierConnectionTimer.resetTimer();
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

	eventSelectUnit(unit) {
		this.statusPanel.eventSelectUnit(unit);
		this.flagUnitSelected = true;
		this.barrierConnectionTimer.resetTimer();
	}
	
	eventDeselect() {
		this.statusPanel.eventDeselect();
		this.flagUnitSelected = false;
		this.barrierConnectionTimer.resetTimer();
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

	addNewEffect(effect) {
		this.effectList.push(effect);
	}

    endPhase() {
        this.stage.endTurn(this);
        this.framesBeforeChangePhase = 80;
        this.isPhaseBlocked = true;
        if (this.currentPhase === this.PHASE_PLAYER) {
            this.addNewEffect(new EffectStartPhase(this, true));
        } else if (this.currentPhase === this.PHASE_ENEMY) {
            this.addNewEffect(new EffectStartPhase(this, false));
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

	findUnitByID(isEnemy, id) {
		//alert(id);
		let unit = this.enemyUnitList.find(function (unit) {return unit.unitID === id;});
		//let unit = null;
		//this.enemyUnitList.forEach(u => {if (u.unitID === id) unit = u;})
		//alert(unit);
		return unit;
		//if (isEnemy) return ;
		//else return this.playerUnitList.find(unit => unit.unitID === id);
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
		if (unit.isEnemy) {
			this.enemyUnitList.forEach(eu => {
				if (eu.barrierTotal !== null && eu.barrierTotal > 0) {
					eu.eventLoseBarrier(unit);
				}
			});
		}
		
        if (unit.isEnemy) removeObjectFromList(unit, this.enemyUnitList);
        else { 
			//removeObjectFromList(unit, this.playerUnitList); // to draw the grave
			this.gameResult = consts.gameResult.Lose;
		}

        if (this.enemyUnitList.length <= 0)
            this.gameResult = consts.gameResult.Win;
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

	gameEnds() {
		if (this.gameResult === consts.gameResult.Win) {
			this.addNewEffect(new EffectStageClear(this));
			this.gameResult = consts.gameResult.GameEnded;
			//this.currentPhase = this.PHASE_NONE;
		}
		if (this.gameResult === consts.gameResult.Lose) {
			//alert("GAME OVER");
			this.addNewEffect(new EffectGameOver(this));
			this.gameResult = consts.gameResult.GameEnded;
			//this.currentPhase = this.PHASE_NONE;
		}
	}

    update(df) {
		if (this.gameResult !== consts.gameResult.None) {
			this.gameEnds();
			// return;
		}
		
		this.timerList.forEach(object => object.update(df));
		this.buttonList.forEach(object => object.update(df));
		
        if (this.framesBeforeChangePhase > 0) this.procChangePhase(df);
		if (this.gameResult === consts.gameResult.None) {
			if (this.currentPhase === this.PHASE_ENEMY) this.enemyAI.update(df);
			if (this.currentPhase === this.PHASE_PLAYER) this.playerInputHandler.update(df);
		}

        this.playerUnitList.forEach(object => object.update(df));
        this.enemyUnitList.forEach(object => object.update(df));
		
        this.effectList.forEach(object => object.update(df));
    }

    draw(ctx) {
        this.stage.draw(ctx);
		this.buttonList.forEach(object => object.draw(ctx));
        this.grid.draw(ctx);
		this.statusPanel.draw(ctx);
		
		this.playerUnitList.forEach(object => object.drawThreat(ctx));
        this.enemyUnitList.forEach(object => object.drawThreat(ctx));
        this.playerUnitList.forEach(object => object.drawUnitBG(ctx));
        this.enemyUnitList.forEach(object => object.drawUnitBG(ctx));
        this.playerUnitList.forEach(object => object.drawUnit(ctx));
        this.enemyUnitList.forEach(object => object.drawUnit(ctx));
		
		this.enemyUnitList.forEach(object => {
			if (object.drawBarrierConnection !== undefined) 
				object.drawBarrierConnection(ctx);
		});
		
		this.threatMap.draw(ctx);

        this.effectList.forEach(object => object.draw(ctx));

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
