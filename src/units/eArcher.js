import ProtoEnemy from "/src/units/protoEnemy";
import texts from "/src/texts/texts_jp";

export default class EArcher extends ProtoEnemy {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.eArcher;
		this.imageID = "img_eArcher";

		this.moveDistMax = 2;
		this.attackRange = 2;
		
	}
}