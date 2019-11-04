import consts from "/src/consts";

export default class MapSelecter {
	constructor (hGame) {
		let divSelecter = document.getElementById("skillSelecter");
		
		let maxSkills = consts.game.maxSkillNumber;
		let unitNum = consts.game.maxPlayerUnitNumber;
		let str = `
		<br />
		<button type="button" class="collapsible2">Custom skills</button>
		<div class="collapsedContent2">
		`;
		
		for (let u = 1; u <= unitNum; u ++) {
			str += `Unit ` + u + `: <br />`;
			for (let i = 1; i <= maxSkills; i ++) {
				str += hGame.skillCreator.getSkillListStringForSelecter(i, u);
				str += `<br />`;
			}
			str += `<br />`;
		}
		str += `<button id="divSkillSelecter_confirm">Confirm</button>
		<button id="divSkillSelecter_usePreset">Use preset skills</button>
		<br /></div>`;
		
		divSelecter.innerHTML = str;
		
		let button = document.getElementById("divSkillSelecter_confirm");
		button.addEventListener("click", event => {
			let skills = [];
			for (let u = 1; u <= unitNum; u ++) {
				skills[u] = [];
				for (let i = 1; i <= maxSkills; i ++) {
					let e = document.getElementById("divSkillSelecter_"+u+"_"+i+"_list");
					skills[u][i] = e.options[e.selectedIndex].value;
					//alert("confirmed " + u + "[" + i + "]= "+ skills[u][i]);
				}
			}
			hGame.changePlayerSkillsAndRestart(skills);
		});
		
		document.getElementById("divSkillSelecter_usePreset").addEventListener("click", event => {
			hGame.usePresetSkillsAndRestart();
		});
	}

}