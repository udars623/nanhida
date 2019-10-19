import ProtoPlayer from "/src/units/protoPlayer";
import consts from "/src/consts";
import texts from "/src/texts/texts_jp";

export default class PCabbage extends ProtoPlayer {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.pCabbage;
		this.imageID = "img_cabbage";
		
		this.moveDistMax = 2;
		this.attackRange = 0;
		
		this.params.moveAssist = consts.moveAssist.reposition;
	}
}