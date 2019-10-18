import ProtoEnemy from "/src/units/protoEnemy";

export default class EArcher extends ProtoEnemy {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.imageID = "img_eArcher";
		this.staminaMax = 1;
		this.moveDistMax = 2;
		this.attackRange = 2;
		
	}
}