import ProtoPlayer from "/src/units/protoPlayer";
import texts from "/src/texts/texts_jp";

export default class PKenshi extends ProtoPlayer {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.pKenshi;
		this.imageID = "img_kenshi";
		
		this.moveDistMax = 2;
		this.attackRange = 1;
	}
}