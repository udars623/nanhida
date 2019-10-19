import consts from "/src/consts";
import texts from "/src/texts/texts_jp";

export default class SkillPassive {
	constructor (unit, level) {
		this.hUnit = unit;
		this.level = level;
		
		this.isPassive = true; // important, decides when & how the skill is applied
		// others are like isBuffEveryTurn, isMovementMutator etc. 
		
		this.skillID = consts.skills.none; // set this after super
	}
	
	applyOnce() {
		// change staminaMax, etc.
	}
	
	// other stuffs... still not sure how to implement stuffs like sendo. sigh...
	// also there can be skills that apply "online" e.g. waves...
	// well they perhaps should be called active skills so we don't need to worry about them atm lol
}
