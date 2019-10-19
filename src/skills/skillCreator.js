import consts from "/src/consts";
import ExtraStamina from "/src/skills/passive/extraStamina";

/*
	When adding a new skill:
	(1) import it above
	(2) add it into this.list @ constructor. Just use [x], forget about push
	(3) update consts.js, texts_##.js
*/

export default class SkillCreator {
	constructor () {
		this.list = [100];
		this.list[consts.skills.extraStamina] = ExtraStamina;
	}
	
	createSkill(unit, skillStr, level) {
		//alert(unit +", "+ skillStr +", "+ level);
		let newSkill = new this.list[consts.skills[skillStr]](unit, level);
		return newSkill;
	}
	
}