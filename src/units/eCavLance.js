import ProtoEnemy from "/src/units/protoEnemy";
import consts from "/src/consts";

export default class ECavLance extends ProtoEnemy {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.imageID = "img_eKibaYari";
		this.staminaMax = 1;
		this.moveDistMax = 3;
		this.attackRange = 1;
		this.moveType = consts.moveTypes.cavalry;
	}
}