import OldStage04 from "/src/stages/oldStage04";
import StageTestReinforcement from "/src/stages/test_reinforcement";
import StageTestBarrier from "/src/stages/test_barrier";

import Stage0000 from "/src/stages/stage_0_0";
import Stage0001 from "/src/stages/stage_0_1";
import Stage0002 from "/src/stages/stage_0_2";
import Stage0003 from "/src/stages/stage_0_3";
import Stage0004 from "/src/stages/stage_0_4";
import Stage0005 from "/src/stages/stage_0_5";
import Stage0006 from "/src/stages/stage_0_6";
import Stage0101 from "/src/stages/stage_1_1";
import Stage0102 from "/src/stages/stage_1_2";
import Stage0103 from "/src/stages/stage_1_3_easy";
import Stage0104 from "/src/stages/stage_1_4";
import Stage0105 from "/src/stages/stage_1_5";

/*
	When adding a new stage:
	(1) import it above
	(2) push it into this.list @ constructor
*/

export default class StageList {
	constructor () {
		this.list = [];
		this.defaultStageIdx = 0;
		
		this.list.push(Stage0000);
		this.list.push(Stage0001);
		this.list.push(Stage0002);
		this.list.push(Stage0003);
		this.list.push(Stage0004);
		this.list.push(Stage0005);
		this.list.push(Stage0006);
		this.list.push(Stage0101);
		this.list.push(Stage0102);
		this.list.push(Stage0103);
		this.list.push(Stage0104);
		this.list.push(Stage0105);
		
		this.list.push(OldStage04);
		this.list.push(StageTestBarrier);
		this.list.push(StageTestReinforcement);
	}
	
	loadStage(idxStr, hGame) {
		let stage = this.list[parseInt(idxStr)];
		//alert(stageClass + ", " + "Stage "+idxStr);
		hGame.stage = stage.stageCreator();
	}
	
	getStageListStringForMapSelecter() {
		let str = `
		Map:
		<select id="divSelecter_list">`;
		
		let len = this.list.length;
		for (let i = 0; i < len; i ++) {
			str += `<option value="`+ i 
			+ (i === this.defaultStageIdx ? `" selected` : `"`)
			+`>` + this.list[i].nameStr + `</option>
			`;
		}
		
		str += `</select>
		<button id="divSelecter_confirm">Confirm</button>
		<br />
		`;
		return str;
	}
	
}