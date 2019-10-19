import ProtoPlayer from "/src/units/protoPlayer";
import consts from "/src/consts";
import texts from "/src/texts/texts_jp";

export default class PBlueberry extends ProtoPlayer {
	constructor(unitID, hGame, gridPos, isEnemy, params) {
		super(unitID, hGame, gridPos, isEnemy, params);
		this.nameStr = texts.unit.pBlueberry;
		this.imageID = "img_blueberry";
		
		this.moveDistMax = 2;
		this.attackRange = 0;
		
		this.params.moveAssist = consts.moveAssist.swap;
		
		this.params.skills = [];
		this.params.skills.push({
			skill: "extraStamina",
			level: 1
		});
	}
}