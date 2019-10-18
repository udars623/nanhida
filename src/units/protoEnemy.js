import UnitBase from "/src/unitBase";

/*
	params: {
		moveAssist
	}
*/

export default class ProtoEnemy extends UnitBase {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy);
		this.params = params;
	}
}