import UnitBase from "/src/unitBase";

/*
	params: {
		moveAssist
	}
*/

export default class ProtoPlayer extends UnitBase {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy);
		this.params = JSON.parse(JSON.stringify(params));
		if (this.params.skills === undefined) this.params.skills = [];
		
		this.isFighter = false; // decides whether this unit can equip fighter skills
	}
}
