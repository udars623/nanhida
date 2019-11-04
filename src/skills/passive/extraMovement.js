import SkillPassive from "/src/skills/skillPassive";
import consts from "/src/consts";

export default class ExtraMovement extends SkillPassive {
	constructor (unit, level) {
		super(unit, level);
		this.skillID = consts.skills.extraMovement;
	}
	
	applyOnce() {
		this.hUnit.moveDistMax += this.level;
	}
}
