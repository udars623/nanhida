import consts from "/src/consts";

const CTRL_STATE_NONE = 0; // no player unit selected (can have enemy unit selected)
const CTRL_STATE_SELECTED = 1; // player unit selected
const CTRL_STATE_DEST_CHOSEN = 2; // move pos selected
const CTRL_STATE_TARGET_CHOSEN = 3; // attack target selected, one more click to execute

// this shit will be used by both player and AI
// AI use it by faking clicks. It'll be a longer seq of codes for AI scripts but it will make sure consistency.
// under such framework, AI should never call unit's event methods.

export default class AbstractController {
    constructor(game, isEnemy) {
        this.hGame = game;
        this.isEnemy = isEnemy;
        this.ctrlState = CTRL_STATE_NONE;
        this.currentUnit = null;
        this.currentDest = null;
        this.currentTarget = null;
    }

    stateDeselect() {
        this.currentUnit.eventDeselect();
        this.currentUnit = null;
        this.ctrlState = CTRL_STATE_NONE;
    }

    stateConfirmDestination(gp) {
        this.currentDest = gp;
        this.ctrlState = CTRL_STATE_DEST_CHOSEN;
        this.currentUnit.eventProposeDestination(gp);
    }

    stateConfirmTarget(unit) {
        this.ctrlState = CTRL_STATE_TARGET_CHOSEN;
        this.currentTarget = unit;
        this.currentUnit.eventProposeTarget(unit);
        unit.eventBeTargeted(); // this doesn't seem right here, should be in Game or at least another class
    }

    clickButton(buttonID) {
        if (buttonID === consts.buttons.TurnEnd) {
            // do something
        } else if (buttonID === consts.buttons.Wait) {
            if (this.ctrlState === CTRL_STATE_NONE) {
                return false;
            } else {
                this.currentUnit.eventExecuteWait();
                this.stateDeselect();
                return true;
            }
        }
        return false;
    }

    clickGP(gp) {
        if (
            gp.x < 1 ||
            gp.x > this.hGame.maxGrid.x ||
            gp.y < 1 ||
            gp.y > this.hGame.maxGrid.y
        ) {
            //localAlert("the selected position is out of bound");
            return false;
        }

        if (this.ctrlState === CTRL_STATE_NONE) {
            // no player unit selected before, check which unit to select now
            if (this.currentUnit !== null) {
                this.currentUnit.eventDeselect();
                this.currentUnit = null;
            }
            let unit = this.hGame.findSelfUnitByGridPos(this.isEnemy, gp);
            if (unit !== null) {
                if (unit.isActive()) this.ctrlState = CTRL_STATE_SELECTED;
                this.currentUnit = unit;
                unit.eventSelect();
            } else {
                unit = this.hGame.findOppoUnitByGridPos(this.isEnemy, gp);
                if (unit !== null) {
                    this.currentUnit = unit;
                    unit.eventSelect();
                }
            }
            if (unit === null) {
                //localAlert("No unit found");
                this.ctrlState = CTRL_STATE_NONE;
                return false;
            }
        } else if (this.ctrlState === CTRL_STATE_SELECTED) {
            // player unit selected, check where to move now
            let unit = this.hGame.findUnitByGridPos(gp);
            if (unit === null && this.currentUnit.checkMoveDestination(gp)) {
                this.stateConfirmDestination(gp);
                return true;
            } else {
                if (
                    unit !== null &&
                    unit.isEnemy !== this.isEnemy &&
                    this.currentUnit.checkAttackTarget(
                        unit,
                        this.currentUnit.gridPos
                    )
                ) {
                    localAlert(
                        "selected an eligible target during dest proposition"
                    );
                    this.stateConfirmDestination(this.currentUnit.gridPos);
                    this.stateConfirmTarget(unit);
                    return true;
                } else {
                    localAlert("invalid destination");
                    this.stateDeselect();
                    return false;
                }
            }
        } else if (this.ctrlState === CTRL_STATE_DEST_CHOSEN) {
            // destination chosen, execute movement or find attack target.
            let unit = this.hGame.findUnitByGridPos(gp);
            if (
                unit === null &&
                gp.x === this.currentDest.x &&
                gp.y === this.currentDest.y
            ) {
                // execute movement
                this.currentUnit.eventExecuteMovement(gp);
                this.stateDeselect();
                return true;
            } else {
                if (
                    unit !== null &&
                    unit.isEnemy !== this.isEnemy &&
                    this.currentUnit.checkAttackTarget(unit, this.currentDest)
                ) {
                    // target confirmed
                    this.stateConfirmTarget(unit);
                    return true;
                } else {
                    // invalid target
                    this.stateDeselect();
                    return false;
                }
            }
        } else if (this.ctrlState === CTRL_STATE_TARGET_CHOSEN) {
            if (
                gp.x === this.currentTarget.gridPos.x &&
                gp.y === this.currentTarget.gridPos.y
            ) {
                // execute attack
                this.currentUnit.eventExecuteAttack(this.currentTarget);
                this.currentTarget.eventStopBeingTargeted();
                this.stateDeselect();
                return true;
            } else {
                // not the same gridpos as proposed target, forfeit
                this.currentTarget.eventStopBeingTargeted();
                this.stateDeselect();
                return false;
            }
        }

        localAlert(
            "this alert should not happen due to returns. x: " +
                gp.x +
                ", y: " +
                gp.y +
                ";  ctrl state: " +
                this.ctrlState
        );

        return true;
    }
}

function localAlert(str) {
    // not sure if it really localise or is still global...
    //alert(str);
}
