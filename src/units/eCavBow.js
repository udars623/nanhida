import ProtoEnemy from "/src/units/protoEnemy";
import consts from "/src/consts";
import texts from "/src/texts/texts_jp";

export default class ECavBow extends ProtoEnemy {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.eCavBow;
		this.imageID = "img_eKibaYumi";

		this.moveDistMax = 3;
		this.attackRange = 2;
		this.moveType = consts.moveTypes.cavalry;
	}
}