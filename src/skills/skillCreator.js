import consts from "/src/consts";
import texts from "/src/texts/texts_jp";
import ExtraStamina from "/src/skills/passive/extraStamina";
import ExtraMovement from "/src/skills/passive/extraMovement";
import PassiveFlyer from "/src/skills/passive/passiveFlyer";
import PassiveRanged from "/src/skills/passive/passiveRanged";

/*
	When adding a new skill:
	(1) import it above
	(2) add it into this.list @ constructor. Just use [x], forget about push
	(3) update consts.js, texts_##.js
*/

export default class SkillCreator {
	constructor () {
		this.defaultIdx = 0;
		this.list = [];
		this.list[consts.skills.extraStamina] = ExtraStamina;
		this.list[consts.skills.extraMovement] = ExtraMovement;
		this.list[consts.skills.passiveRanged] = PassiveRanged;
		//this.list[consts.skills.passiveFlyer] = PassiveFlyer;
		
		this.mapIDtoTexts = [];
		for (let x in consts.skills) {
			this.mapIDtoTexts[consts.skills[x]] = texts.skills[x];
		}
	}
	
	createSkill(unit, skillStr, level) {
		//alert(unit +", "+ skillStr +", "+ level);
		let newSkill = new this.list[consts.skills[skillStr]](unit, level);
		return newSkill;
	}
	
	getSkillListStringForSelecter(num, unit) {
		let str = `Skill `+num+`:
		<select id="divSkillSelecter_`+unit+"_"+num+`_list">`;
		
		let len = this.list.length;
		for (let i = 0; i < len; i ++) {
			if (i !== consts.skills.none && this.list[i] === undefined) continue;
			
			str += `<option value="`+ i 
			+ (i === this.defaultIdx ? `" selected` : `"`)
			+`>` + this.mapIDtoTexts[i] + `</option>
			`;
		}
		
		str += `</select>`;
		return str;
	}
}