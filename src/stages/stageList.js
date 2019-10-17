import Stage0 from "/src/stages/stage0";
import Stage1 from "/src/stages/stage1";
import Stage2 from "/src/stages/stage2";
import Stage3 from "/src/stages/stage3";

/*
	When adding a new stage:
	(1) import it above
	(2) add it into this.list @ constructor. Just use [x], forget about push
	(3) update the str @ getStageListStringForMapSelecter()
	
	the good side of this stupid implementation:
		now you can use any name for stage files and imported modules.
*/

export default class StageList {
	constructor () {
		this.list = [100];
		
		this.list[0] = Stage0;
		this.list[1] = Stage1;
		this.list[2] = Stage2;
		this.list[3] = Stage3;
	}
	
	loadStage(idxStr, hGame) {
		let stageClass = this.list[parseInt(idxStr)];
		//alert(stageClass + ", " + "Stage "+idxStr);
		hGame.stage = stageClass();
	}
	
	getStageListStringForMapSelecter() {
		let str = `
		Map:
		<select id="divSelecter_list">
			<option value="0" selected>Stage 00</option>
			<option value="1">Stage 01</option>
			<option value="2">Stage 02</option>
			<option value="3">Stage 03</option>
		</select>
		<button id="divSelecter_confirm">Confirm</button>
		<br />
		`;
		return str;
	}
	
}