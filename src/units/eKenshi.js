import ProtoEnemy from "/src/units/protoEnemy";
import texts from "/src/texts/texts_jp";

export default class EKenshi extends ProtoEnemy {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.eKenshi;
		this.imageID = "img_kenshi2";

		this.moveDistMax = 2;
		this.attackRange = 1;
		
	}
}