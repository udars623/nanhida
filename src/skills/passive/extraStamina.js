import SkillPassive from "/src/skills/skillPassive";
import consts from "/src/consts";
import texts from "/src/texts/texts_jp";

export default class ExtraStamina extends SkillPassive {
	constructor (unit, level) {
		super(unit, level);
		this.skillID = consts.skills.extraStamina;
	}
	
	applyOnce() {
		this.hUnit.staminaMax += this.level;
		//alert(this.hUnit.staminaMax);
	}
}
