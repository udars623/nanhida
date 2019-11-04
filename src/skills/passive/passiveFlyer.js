import SkillPassive from "/src/skills/skillPassive";
import consts from "/src/consts";

export default class PassiveFlyer extends SkillPassive {
	constructor (unit, level) {
		super(unit, level);
		this.skillID = consts.skills.passiveFlyer;
	}
	
	applyOnce() {
		this.hUnit.moveType = consts.moveTypes.flyer;
	}
}
