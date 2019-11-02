/* 
	behaviour: see update()
*/

export default class GeneralTimer {
	constructor (hGame, dfRate, maxValue) {
		this.hGame = hGame;
		this.maxValue = maxValue;
		this.dfRate = dfRate;
		this.timer = 0;
	}
	
	resetTimer() {
		this.timer = 0;
	}
	
	update(df) {
		this.timer += df * this.dfRate;
		if (this.timer > this.maxValue) this.timer = 0; 
	}
}