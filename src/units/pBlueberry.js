import ProtoPlayer from "/src/units/protoPlayer";
import consts from "/src/consts";

export default class PBlueberry extends ProtoPlayer {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.imageID = "img_blueberry";
		this.staminaMax = 2;
		this.moveDistMax = 2;
		this.attackRange = 0;
		this.params.moveAssist = consts.moveAssist.swap;
	}
}