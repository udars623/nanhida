import ProtoPlayer from "/src/units/protoPlayer";
import consts from "/src/consts";

export default class PCabbage extends ProtoPlayer {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.imageID = "img_cabbage";
		this.staminaMax = 1;
		this.moveDistMax = 2;
		this.attackRange = 0;
		this.params.moveAssist = consts.moveAssist.reposition;
	}
}