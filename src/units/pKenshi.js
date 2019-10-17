import ProtoPlayer from "/src/units/protoPlayer";

export default class PKenshi extends ProtoPlayer {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.imageID = "img_kenshi";
		this.staminaMax = 1;
		this.moveDistMax = 2;
		this.attackRange = 1;
	}
}