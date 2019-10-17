import UnitBase from "/src/unitBase";

export default class ProtoPlayer extends UnitBase {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy);
		this.params = params;
	}
}