import ProtoPlayer from "/src/units/protoPlayer";
import consts from "/src/consts";

export default class PTomato extends ProtoPlayer {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.imageID = "img_tomato";
		this.staminaMax = 1;
		this.moveDistMax = 2;
		this.attackRange = 0;
		this.params.moveAssist = consts.moveAssist.drawBack;
	}
}