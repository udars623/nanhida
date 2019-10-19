import ProtoEnemy from "/src/units/protoEnemy";
import consts from "/src/consts";
import texts from "/src/texts/texts_jp";

export default class eDKAxe extends ProtoEnemy {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.eDKAxe;
		this.imageID = "img_eDK";
		
		this.moveDistMax = 2;
		this.attackRange = 1;
		this.moveType = consts.moveTypes.flyer;
	}
}