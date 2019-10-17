import MoveAssist from "/src/skills/moveAssist";
import consts from "/src/consts"

export default class MoveAssistList {
	constructor (hGame) {
		this.hGame = hGame;
		this.list = [10];
		
		let repo = new MoveAssist(hGame);
		repo.dUser[2] = 	{x: 0, y: 0};
		repo.dTarget[2] = 	{x: 0, y: -2};
		repo.copyToFourDirs();
		this.list[consts.moveAssist.reposition] = repo;
		
		let drawBack = new MoveAssist(hGame);
		drawBack.dUser[2] = 	{x: 0, y: -1};
		drawBack.dTarget[2] = 	{x: 0, y: -1};
		drawBack.copyToFourDirs();
		this.list[consts.moveAssist.drawBack] = drawBack;
		
		let swap = new MoveAssist(hGame);
		swap.dUser[2] = 	{x: 0, y: +1};
		swap.dTarget[2] = 	{x: 0, y: -1};
		swap.copyToFourDirs();
		this.list[consts.moveAssist.swap] = swap;

	}
	
	checkEligibility(maID, user, dest, target) {
		if (this.list[maID] === null) return false;
		return this.list[maID].checkEligibility(user, dest, target);
	}
	
	execute(maID, user, target) {
		if (this.list[maID] === null) return false;
		// assume checkEligibility is already passed
		this.list[maID].execute(user, target);
		return true;
	}
	
}