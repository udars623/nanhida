import ProtoPlayer from "/src/units/protoPlayer";
import consts from "/src/consts";
import texts from "/src/texts/texts_jp";

export default class PTomato extends ProtoPlayer {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.pTomato;
		this.imageID = "img_tomato";
		
		this.moveDistMax = 2;
		this.attackRange = 0;
		
		this.params.moveAssist = consts.moveAssist.drawBack;
	}
}