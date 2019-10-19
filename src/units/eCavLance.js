import ProtoEnemy from "/src/units/protoEnemy";
import consts from "/src/consts";
import texts from "/src/texts/texts_jp";

export default class ECavLance extends ProtoEnemy {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.eCavLance;
		this.imageID = "img_eKibaYari";

		this.moveDistMax = 3;
		this.attackRange = 1;
		this.moveType = consts.moveTypes.cavalry;
	}
}