import SkillPassive from "/src/skills/skillPassive";
import consts from "/src/consts";

export default class PassiveRanged extends SkillPassive {
	constructor (unit, level) {
		super(unit, level);
		this.skillID = consts.skills.passiveRanged;
		this.isFighterSkill = true;
	}
	
	applyOnce() {
		this.hUnit.attackRange = 2;
	}
}
