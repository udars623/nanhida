import ProtoPlayer from "/src/units/protoPlayer";
import texts from "/src/texts/texts_jp";
import consts from "/src/consts";

export default class PKenshiJinlai extends ProtoPlayer {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.pKenshiJinlai;
		this.imageID = "img_kenshi";

		this.moveDistMax = 2;
		this.attackRange = 1;
		
		this.params.skills.push({
			skill: "extraStamina",
			level: 1
		});
	}
}